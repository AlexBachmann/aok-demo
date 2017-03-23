<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\UserBundle\Security;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Authentication\Token\PreAuthenticatedToken;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Core\Exception\BadCredentialsException;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Http\Authentication\SimplePreAuthenticatorInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationFailureHandlerInterface;

class JwtAuthenticator implements SimplePreAuthenticatorInterface, AuthenticationFailureHandlerInterface
{
    public function createToken(Request $request, $providerKey)
    {
        // look for an jwt key in the request header
        $jwt = $request->headers->get('jwt');

        if (!$jwt) {
        	// just skip api key authentication. User will be anonymous
            return null;
        }

        return new PreAuthenticatedToken(
            'anon.',
            $jwt,
            $providerKey
        );
    }

    public function supportsToken(TokenInterface $token, $providerKey)
    {
        return $token instanceof PreAuthenticatedToken && $token->getProviderKey() === $providerKey;
    }

    public function authenticateToken(TokenInterface $token, UserProviderInterface $userProvider, $providerKey)
    {
        if (!$userProvider instanceof JwtUserProvider) {
            throw new \InvalidArgumentException(
                sprintf(
                    'The user provider must be an instance of JwtUserProvider (%s was given).',
                    get_class($userProvider)
                )
            );
        }
        $jwt = $token->getCredentials();
        $user = $userProvider->getUserByJwt($jwt);
        if (!$user) {
            // CAUTION: this message will be returned to the client
            // (so don't put any un-trusted messages / error strings here)
            throw new CustomUserMessageAuthenticationException(
                sprintf('JWT "%s" does not exist.', $jwt)
            );
        }

        return new PreAuthenticatedToken(
            $user,
            $jwt,
            $providerKey,
            $user->getRoles()
        );
    }
    public function onAuthenticationFailure(Request $request, AuthenticationException $exception)
    {
        return new Response(
            // this contains information about *why* authentication failed
            // use it, or return your own message
            strtr($exception->getMessageKey(), $exception->getMessageData()),
            401
        );
    }
}