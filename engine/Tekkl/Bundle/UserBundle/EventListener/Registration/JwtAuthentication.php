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
use Tekkl\Bundle\UserBundle\Event\FilterUserResponseEvent;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class JwtAuthentication {
	public function __construct(AuthenticationSuccessHandlerInterface $authenticationSuccessHanler, TokenStorageInterface $tokenStorage){
		$this->authenticationSuccessHandler = $authenticationSuccessHanler;
		$this->tokenStorage = $tokenStorage;
	}
	public function onRegistrationCompleted(FilterUserResponseEvent $event){
		$request = $event->getRequest();
		$token = $this->tokenStorage->getToken();

		$response = $this->authenticationSuccessHandler->onAuthenticationSuccess($request, $token);
		$event->setResponse($response);
	}
}