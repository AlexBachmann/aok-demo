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

use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authentication\Token\AnonymousToken;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use FOS\UserBundle\FOSUserEvents;
use Tekkl\Bundle\UserBundle\Event\FilterUserResponseEvent;

class JwtAuthentication implements EventSubscriberInterface {
	public function __construct(AuthenticationSuccessHandlerInterface $authenticationSuccessHanler, TokenStorageInterface $tokenStorage){
		$this->authenticationSuccessHandler = $authenticationSuccessHanler;
		$this->tokenStorage = $tokenStorage;
	}
	/**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return array(
            FOSUserEvents::REGISTRATION_COMPLETED => 'authenticate',
            FOSUserEvents::REGISTRATION_CONFIRMED => 'authenticate',
            FOSUserEvents::RESETTING_RESET_COMPLETED => 'authenticate',
        );
    }
	public function authenticate(FilterUserResponseEvent $event){
		$request = $event->getRequest();
		$token = $this->tokenStorage->getToken();
		
		if($token instanceof AnonymousToken){
			return;
		}
		$response = $this->authenticationSuccessHandler->onAuthenticationSuccess($request, $token);
		$event->setResponse($response);
	}
}