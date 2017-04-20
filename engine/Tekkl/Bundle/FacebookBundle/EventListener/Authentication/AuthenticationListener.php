<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\FacebookBundle\EventListener\Authentication;

use Tekkl\Bundle\FacebookBundle\Event\FacebookAuthenticationEvent;
use Symfony\Component\Security\Http\Authentication\AuthenticationSuccessHandlerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Authentication\Token\PreAuthenticatedToken;

class AuthenticationListener {
	private $firewallName = 'main';

	public function __construct(AuthenticationSuccessHandlerInterface $authenticationSuccessHandler, TokenStorageInterface $tokenStorage){
		$this->authenticationSuccessHandler = $authenticationSuccessHandler;
		$this->tokenStorage = $tokenStorage;
	}

	public function onAuthenticationSuccess(FacebookAuthenticationEvent $event){
		$request = $event->getRequest();
		$user = $event->getUser();

		$token = $this->createToken($user);
		$this->tokenStorage->setToken($token);

		$response = $this->authenticationSuccessHandler->onAuthenticationSuccess($request, $token);

		$event->setResponse($response);
	}
	private function createToken(UserInterface $user){
		$token = new PreAuthenticatedToken($user, '', $this->firewallName);
		return $token;
	}
}