<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\UserBundle\Security\Http\Authentication;

use Lexik\Bundle\JWTAuthenticationBundle\Security\Http\Authentication\AuthenticationFailureHandler as BaseFailureHandler;
use Tekkl\Bundle\UserBundle\Response\JWTAuthenticationFailureResponse;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationFailureEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Events;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\HttpFoundation\Cookie;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;

class AuthenticationFailureHandler extends BaseFailureHandler {
	public function __construct(EventDispatcherInterface $dispatcher, $cookieName){
        $this->dispatcher = $dispatcher;
        $this->cookieName = $cookieName;
    }
	public function onAuthenticationFailure(Request $request, AuthenticationException $exception){
        $event = new AuthenticationFailureEvent($exception, new JWTAuthenticationFailureResponse());

        $this->dispatcher->dispatch(Events::AUTHENTICATION_FAILURE, $event);

        $response = $event->getResponse();
        if($response){
        	$response->headers->setCookie(new Cookie($this->cookieName, '', time() + 30, '/'));
        }
        return $response;
    }
}