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
use Tekkl\Bundle\AppBundle\Service\MailerInterface;

class EmailConfirmation implements EventSubscriberInterface {
	public function __construct(MailerInterface $mailer, TokenGeneratorInterface $tokenGenerator, $linkTemplate){
		$this->mailer = $mailer;
		$this->tokenGenerator = $tokenGenerator;
        $this->linkTemplate = $linkTemplate;
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
        $response = $event->getResponse();
        $locale = $request->getLocale();

        $this->sendConfimrationMail($user, $locale);
	}
    protected function sendConfimrationMail($user, $locale){
        $user->setEnabled(false);
        if (null === $user->getConfirmationToken()) {
            $user->setConfirmationToken($this->tokenGenerator->generateToken());
        }
        $this->mailer   ->setTo($user->getEmail())
                        ->setHtmlTemplate(sprintf('@TekklUser/Email/%s/registration_confirmation.html', $locale))
                        ->setPlainTemplate(sprintf('@TekklUser/Email/%s/registration_confirmation.txt.html', $locale))
                        ->loadVars([
                            'username'  => $user->getUsername(),
                            'email'     => $user->getEmail(),
                            'confirmationToken' => $user->getConfirmationToken(),
                            'confirmationLink' => $this->createConfirmationLink($user)
                        ])
                        ->send();

    }
	public function createConfirmationLink($user){
		return sprintf($this->linkTemplate, $user->getConfirmationToken());
	}
}