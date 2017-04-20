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
use Tekkl\Bundle\FacebookBundle\Model\FacebookUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;

interface FacebookUserManagerInterface {
	/**
	 * Returns the FacebookUser class defined in the configuration
	 * 
	 * @return string configured FacebookUser class
	 */
	public function getClass();

	/**
	 * Creates an empty FacebookUser object
	 *
	 * @return  FacebookUserInterface
	 */
	public function createUser();

	/**
     * Updates a facebook user.
     *
     * @param FacebookUserInterface $user
     */
    public function updateUser(FacebookUserInterface $user);

    /**
     * Returns a System User based on the given Facebook User ID
     * 
     * @param  int $facebookId The Facebook User ID
     * @return mixed UserInterface | null  The user object or NULL if no user exists
     */
    public function findUserByFacebookId($facebookId);

    /**
     * Returns a system user based on the email
     * 
     * @param  string $email The users email address
     * @return mixed UserInterface | null  The user object or NULL if no user exists
     */
    public function findUserByEmail($email);

    /**
     * Generates a valid username based on the Facebook Name of the user
     * 
     * @param  string $facebookName The user's facebook name
     * @return string a valid username for this user
     */
    public function generateUserNameFromFacebookName($facebookName);

    /**
     * Create a new system user 
     * 
     * @param  string $username The user's username
     * @param  string $email    The user's email
     * @return UserInterface The user object
     */
    public function createSystemUser($username, $email);

    /**
     * Connect a system user with the facebook user object
     * 
     * @param  UserInterface         $user         The system user object
     * @param  FacebookUserInterface $facebookUser The facebook user object
     * @return void
     */
   	public function attachFacebookUserToSystemUser(UserInterface $user, FacebookUserInterface $facebookUser);
}