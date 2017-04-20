<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\FacebookBundle\Event;

use Symfony\Component\EventDispatcher\Event;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\User\UserInterface;

class FacebookAuthenticationEvent extends Event {
	
	/**
	 * @var Request
	 */
	private $request;

	/**
	 * @var Response
	 */
	private $response;

	/**
	 * @var UserInterface
	 */
	private $user;

	/**
	 * Constructor
	 * @param UserInterface $user    
	 * @param Request              $request 
	 */
	public function __construct(UserInterface $user, Request $request, Response $response){
		$this->user = $user;
		$this->request = $request;
	}

	/**
	 * Sets the request object 
	 * @param Request $request 
	 */
	public function setRequest(Request $request){
		$this->request = $request;
	}

	/**
	 * Returns the request object
	 * @return Request $request
	 */
	public function getRequest(){
		return $this->request;
	}
	/**
	 * Sets response object
	 * @param Response $response
	 */
	public function setResponse(Response $response){
		$this->response = $response;
	}

	/**
	 * Returns response object
	 * @return Response $response
	 */
	public function getResponse(){
		return $this->response;
	}

	/**
	 * Sets the user object
	 * @param UserInterface $user
	 */
	public function setUser(UserInterface $user){
		$this->user = $user;
	}

	/**
	 * Returns the user object
	 * @return UserInterface $user
	 */
	public function getUser(){
		return $this->user;
	}
}