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

interface FacebookUserInterface {
	/**
     * Returns the user unique facebook user ID of the user.
     *
     * @return int
     */
    public function getFacebookUserId();

    /**
     * Sets the unique Facebook User ID of an user
     *
     * @var int $facebookUserId
     */
    public function setFacebookUserId($facebookUserId);

    /**
     * Returns the system user object
     *
     * @return \Symfony\Component\Security\Core\User\UserInterface
     */
    public function getUser();

    /**
     * Sets the system user object
     *
     * @var \Symfony\Component\Security\Core\User\UserInterface $user
     */
    public function setUser(UserInterface $user);
}