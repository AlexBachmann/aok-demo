<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\UserBundle\Util;

use FOS\UserBundle\Model\UserInterface;

class JwtSecretGenerator implements JwtSecretGeneratorInterface {
	/**
     * Generates a JSON Web Token Secret
     *
     * @param UserInterface $user
     * @return string The JWT Secret
     */
	public function generate(UserInterface $user){
		return substr(sha1(uniqid() . $user->getId()), 0, 20);
	}
}