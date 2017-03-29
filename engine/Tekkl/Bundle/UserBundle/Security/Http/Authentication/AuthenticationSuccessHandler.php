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

use Lexik\Bundle\JWTAuthenticationBundle\Security\Http\Authentication\AuthenticationSuccessHandler as BaseSuccessHandler;
use Tekkl\Bundle\UserBundle\Response\JWTAuthenticationSuccessResponse;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Events;
use Symfony\Component\HttpFoundation\Cookie;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTManager;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class AuthenticationSuccessHandler extends BaseSuccessHandler {
	/**
     * @param JWTManager               $jwtManager
     * @param EventDispatcherInterface $dispatcher
     * @param string  $cookieName
     * @param string $authHeaderPrefix
     * @param string $authHeaderName
     */
    public function __construct(
        JWTManager $jwtManager, 
        EventDispatcherInterface $dispatcher,
        $cookieName,
        $cookieTtl,
        $authHeaderPrefix,
        $authHeaderName
    ){
        $this->jwtManager = $jwtManager;
        $this->dispatcher = $dispatcher;
        $this->cookieName = $cookieName;
        $this->cookieTtl = $cookieTtl;
        $this->authHeaderPrefix = $authHeaderPrefix;
        $this->authHeaderName = $authHeaderName;
    }
    public function handleAuthenticationSuccess(UserInterface $user, $jwt = null){
        if (null === $jwt) {
            $jwt = $this->jwtManager->create($user);
        }

        $response = new JWTAuthenticationSuccessResponse($jwt);
        $event    = new AuthenticationSuccessEvent(['token' => $jwt], $user, $response);

        $this->dispatcher->dispatch(Events::AUTHENTICATION_SUCCESS, $event);

        // Don't send the token in the response body
        $data = $event->getData(); 
        unset($data['token']);
        if(!empty($data)) $response->setData($data);

        // Send the token as a XSS protected cookie
        $response->headers->setCookie(new Cookie($this->cookieName, $jwt, time() + $this->cookieTtl, '/', null, false, true));

        // Send token with response header
        $response->headers->set($this->authHeaderName, $this->authHeaderPrefix . ' ' . $jwt);

        return $response;
    }
}