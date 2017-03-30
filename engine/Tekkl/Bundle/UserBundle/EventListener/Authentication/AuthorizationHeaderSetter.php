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

class AuthorizationHeaderSetter {
	public function __construct($authHeaderName, $authHeaderPrefix){
		$this->authHeaderName = $authHeaderName;
		$this->authHeaderPrefix = $authHeaderPrefix;
	}
	public function onAuthenticationSuccess(AuthenticationSuccessEvent $event){
		$response = $event->getResponse();
		$data = $event->getData();
		$jwt = $data['token'];
		$response->headers->set($this->authHeaderName, $this->authHeaderPrefix . ' ' . $jwt);
	}
}