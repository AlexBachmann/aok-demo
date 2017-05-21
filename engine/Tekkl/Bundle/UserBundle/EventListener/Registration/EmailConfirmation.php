<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\UserBundle\EventListener\Registration;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use FOS\UserBundle\Event\FormEvent;
use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Util\TokenGeneratorInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\UserInterface;

class EmailConfirmation implements EventSubscriberInterface {
	public function __construct($mailerHelper, TokenGeneratorInterface $tokenGenerator){
		$this->mailHelper = $mailerHelper;
		$this->tokenGenerator = $tokenGenerator;
	}
	/**
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return array(
            FOSUserEvents::REGISTRATION_SUCCESS => 'onRegistrationSuccess',
        );
    }
	public function onRegistrationSuccess(FormEvent $event){
		/** @var $user \FOS\UserBundle\Model\UserInterface */
        $user = $event->getForm()->getData();
        $request = $event->getRequest();
        $this->sendConfimrationMail($user, $request);
	}
    protected function sendConfimrationMail(UserInterface $user, Request $request){
        $user->setEnabled(false);
        if (null === $user->getConfirmationToken()) {
            $user->setConfirmationToken($this->tokenGenerator->generateToken());
        }
        $this->mailHelper->sendRegistrationConfirmationMail($user, $request);

    }
}