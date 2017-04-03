<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\UserBundle\EventListener\Authentication;

use Symfony\Component\HttpFoundation\RequestStack;
use Gesdinet\JWTRefreshTokenBundle\Service\RefreshToken;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;

class RefreshTokenReauthentication {
	public function __construct(RequestStack $requestStack, RefreshToken $refreshTokenService){
		$this->requestStack = $requestStack;
		$this->refreshTokenService = $refreshTokenService;
	}
	public function reauthenticate(AuthenticationFailureEvent $event){
		static $refreshAttempt = 0;
		$request = $this->requestStack->getCurrentRequest();
		$path = $request->getPathInfo();
		// Make sure, we reenter this loop only once.
		if($refreshAttempt == 0 && $path !== '/api/login_check'){
			$refreshAttempt++;
			$response = $this->refreshTokenService->refresh($request);
			$event->setResponse($response);
		}
	}
}