<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\UserBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="tekkl_user")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    protected $jwt_secret;

    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Set jwtSecret
     *
     * @param string $jwtSecret
     *
     * @return User
     */
    public function setJwtSecret($jwtSecret)
    {
        $this->jwt_secret = $jwtSecret;

        return $this;
    }

    /**
     * Get jwtSecret
     *
     * @return string
     */
    public function getJwtSecret()
    {
        return $this->jwt_secret;
    }
}
