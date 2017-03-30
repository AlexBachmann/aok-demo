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

use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Symfony\Component\HttpFoundation\Cookie;

class CookieSetter {
	public function __construct($cookieName, $cookieTtl){
		$this->cookieName = $cookieName;
		$this->cookieTtl = $cookieTtl;
	}
	public function onAuthenticationSuccess(AuthenticationSuccessEvent $event){
		$response = $event->getResponse();
		$data = $event->getData();
		$jwt = $data['token'];
        $response->headers->setCookie(new Cookie($this->cookieName, $jwt, time() + $this->cookieTtl, '/', null, false, true));
	}
	public function onAuthenticationFailure(AuthenticationFailureEvent $event){
		$response = $event->getResponse();
		$response->headers->setCookie(new Cookie($this->cookieName, '', time() + 30, '/'));
	}
}