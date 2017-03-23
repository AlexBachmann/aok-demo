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
use FOS\UserBundle\Event\UserEvent;
use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Model\UserManagerInterface;
use Tekkl\Bundle\UserBundle\Util\JwtSecretGeneratorInterface;

class JwtSecret implements EventSubscriberInterface {
	public function __construct(UserManagerInterface $userManager, JwtSecretGeneratorInterface $secretGenerator){
		$this->userManager = $userManager;
		$this->secretGenerator = $secretGenerator;
	}
	public static function getSubscribedEvents(){
		return array(
            FOSUserEvents::REGISTRATION_COMPLETED => array(
                array('onRegistrationCompleted', 0)
            )
        );
	}
	public function onRegistrationCompleted(UserEvent $event){
		$user = $event->getUser();
		$secret = $this->secretGenerator->generate($user);
		$user->setJwtSecret($secret);
		$this->userManager->updateUser($user);
	}
}