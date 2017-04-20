<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\FacebookBundle\Doctrine;

use Doctrine\Common\Persistence\ObjectManager;
use Doctrine\Common\Persistence\ObjectRepository;
use FOS\UserBundle\Model\UserManagerInterface;
use FOS\UserBundle\Util\CanonicalizerInterface;
use Tekkl\Bundle\FacebookBundle\Model\FacebookUserManager as BaseUserManager;
use Tekkl\Bundle\FacebookBundle\Model\FacebookUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class FacebookUserManager extends BaseUserManager {
	/**
     * @var ObjectManager
     */
	protected $objectManager;

	public function __construct(UserManagerInterface $userManager, CanonicalizerInterface $usernameCanonicalizer, ObjectManager $om, $class)
	{
		parent::__construct($userManager, $usernameCanonicalizer, $class);
		$this->objectManager = $om;
	}
	/**
     * @return ObjectRepository
     */
    protected function getRepository(){
        return $this->objectManager->getRepository($this->getClass());
    }

    /**
     * @return ObjectRepository
     */
    protected function getUserRepository(){
        return $this->objectManager->getRepository($this->userManager->getClass());
    }

    /**
     * {@inheritdoc}
     */
    public function findUserByFacebookId($facebookId){
        return $this->getRepository()->findOneBy(['facebook_user_id' => $facebookId]);
    }
	/**
     * {@inheritdoc}
     */
    public function updateUser(FacebookUserInterface $user, $andFlush = true){
        $this->objectManager->persist($user);
        if ($andFlush) {
            $this->objectManager->flush();
        }
    }
    /**
     * {@inheritdoc}
     */
    public function attachFacebookUserToSystemUser(UserInterface $user, FacebookUserInterface $facebookUser){
    	$facebookUser->setUser($user);
    	$this->updateUser($facebookUser);
    }
    protected function findCollidingUsernames($username){
        $username_canonical = $this->usernameCanonicalizer->canonicalize($username);
        $result = $this->getUserRepository()
                    ->createQueryBuilder('u')
                    ->where('u.usernameCanonical LIKE :username')
                    ->setParameter('username', $username_canonical . '%')
                    ->getQuery()
                    ->getResult();
        return $result;
    }
}