<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\FacebookBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\UserInterface;
use Tekkl\Bundle\FacebookBundle\Model\FacebookUser as BaseUser;

/**
 * @ORM\Entity
 * @ORM\Table(name="tekkl_facebook_user")
 */
class FacebookUser extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="bigint")
     */
    protected $facebook_user_id;

	/**
     * Many Users have One Address.
     * @ORM\ManyToOne(targetEntity="\Symfony\Component\Security\Core\User\UserInterface")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     */
    protected $user;
}