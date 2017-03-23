<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\UserBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\View;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;

class LoginController extends FOSRestController
{
    /**
     * @View()
     */
    public function indexAction()
    {
        throw new UnauthorizedHttpException('You need to login', 'Login required');
    }
}
