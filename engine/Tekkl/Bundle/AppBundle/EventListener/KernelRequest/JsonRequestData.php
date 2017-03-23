<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\AppBundle\EventListener\KernelRequest;

use Symfony\Component\HttpKernel\Event\GetResponseEvent;

class JsonRequestData {
	public function __construct($methods = ['POST', 'PUT'], $pathPattern = null){
		$this->methods = $methods;
		$this->pathPattern = $pathPattern;
	}
	public function onKernelRequest(GetResponseEvent $event){
		$request = $event->getRequest();

		if($this->pathPattern){
			$uri = $request->getRequestUri();
			$pattern = '#' . $this->pathPattern . '#';
			if(!preg_match($pattern, $uri)){
				return;
			}
		}
		if(
			in_array(strtoupper($request->getMethod()), $this->methods) ||
			0 === strpos($request->headers->get('Content-Type'), 'application/json')
		){
        	$data = json_decode($request->getContent(), true);
        	$request->request->replace(is_array($data) ? $data : array());
    	}
	}
}