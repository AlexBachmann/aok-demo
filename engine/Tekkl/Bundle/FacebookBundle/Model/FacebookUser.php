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
use Symfony\Component\Security\Core\User\UserInterface;

abstract class FacebookUser implements FacebookUserInterface {
	/**
     * @var int
     */
    protected $facebook_user_id;

    /**
     * @var \Symfony\Component\Security\Core\User\UserInterface
     */
    protected $user;

    /**
     * {@inheritdoc}
     */
    public function getFacebookUserId(){
        return $this->facebook_user_id;
    }

    /**
     * {@inheritdoc}
     */
    public function setFacebookUserId($facebook_user_id){
        $this->facebook_user_id = $facebook_user_id;
    }

    /**
     * {@inheritdoc}
     */
    public function getUser(){
    	return $this->user;
    }

    /**
     * {@inheritdoc}
     */
    public function setUser(UserInterface $user){
        $this->user = $user;
    }
}