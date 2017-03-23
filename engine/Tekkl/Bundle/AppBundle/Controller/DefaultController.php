<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    /**
     * @Route("{slug}", name="homepage", requirements={"slug"=".+"})
     */
    public function indexAction($slug = null)
    {
        $path = realpath($this->getParameter('kernel.root_dir').'/..'). DIRECTORY_SEPARATOR . 'web' . DIRECTORY_SEPARATOR . 'index.html';
        $content = file_get_contents($path);
        
        return new Response($content);
    }
}
