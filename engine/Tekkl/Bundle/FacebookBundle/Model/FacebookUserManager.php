<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\FacebookBundle\Model;

use FOS\UserBundle\Model\UserManagerInterface;
use Doctrine\Common\Persistence\ObjectManager;
use FOS\UserBundle\Util\CanonicalizerInterface;

abstract class FacebookUserManager implements FacebookUserManagerInterface {
	
	/**
     * @var UserManagerInterface
     */
    protected $userManager;
    /**
     * @var CanonicalFieldsUpdater
     */
    protected $fieldsUpdater;
    /**
     * @var   string
     */
    protected $class;
    
	public function __construct(UserManagerInterface $userManager, CanonicalizerInterface $usernameCanonicalizer, $class){
		$this->userManager = $userManager;
        $this->usernameCanonicalizer = $usernameCanonicalizer;
		$this->class = $class;
	}

	/**
     * {@inheritdoc}
     */
	public function getClass(){
		return $this->class;
	}

	/**
     * {@inheritdoc}
     */
	public function createUser(){
		$class = $this->getClass();
		return new $class();
	}

    /**
     * {@inheritdoc}
     */
    public function findUserByEmail($email){
        return $this->userManager->findUserByEmail($email);
    }

    /**
     * {@inheritdoc}
     */
    public function createSystemUser($username, $email){
        $user = $this->userManager->createUser();
        $password = uniqid();

        $user->setUsername($username);
        $user->setEmail($email);
        $user->setPlainPassword($password);
        $user->setEnabled(true);

        $this->userManager->updateUser($user);
        return $user;
    }

    public function generateUsernameFromFacebookName($facebookName){
        $validUserName = $this->generateValidUserName($facebookName);
        $validUserName = $this->usernameCanonicalizer->canonicalize($validUserName);

        $collissions = $this->findCollidingUsernames($validUserName);
        $i = 1;
        while($i < 10000){
            $checkname = $validUserName;
            if($i > 1){
                $checkname = $validUserName . $i;
            }
            if(!in_array($checkname, $collissions)){
                return $checkname;
            }
            $i++;
        }
        throw new \Exception('Could not generate a valid username for this user', 500);
    }
    protected function generateValidUserName($name){
        return preg_replace('/[^a-zA-Z0-9]/', '_', $name);
    }
}