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

use Doctrine\ORM\EntityManager;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\User\User;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;

class JwtUserProvider implements UserProviderInterface
{
    public function __construct(EntityManager $em){
    	$this->em = $em;
    }
    public function getUserByJwt($jwt)
    {
        $repository = $this->em->getRepository('TekklUserBundle:UserToken');
        $repository->deleteExpiredTokens();

        $token = $repository->findOneByToken($jwt);
        if(!$token){
        	return null;
        }
        return $token->getUser();
    }

    public function loadUserByUsername($username)
    {
        $repository = $this->em->getRepository('TekklUserBundle:User');
        $user = $repository->findOneByUsername($username);

        return $user;
    }

    public function refreshUser(UserInterface $user)
    {
        // this is used for storing authentication in the session
        // but in this example, the token is sent in each request,
        // so authentication can be stateless. Throwing this exception
        // is proper to make things stateless
        throw new UnsupportedUserException();
    }

    public function supportsClass($class)
    {
        return User::class === $class;
    }
}	