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
use FOS\UserBundle\FOSUserEvents;
use Tekkl\Bundle\UserBundle\Event\FilterUserResponseEvent;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class ConfirmationController extends FOSRestController
{
	/**
     * @View()
     */
    public function postConfirmAction(Request $request){
		$token = $request->get('token');
		/** @var $dispatcher EventDispatcherInterface */
        $dispatcher = $this->get('event_dispatcher');

		if(!$token){
			throw new BadRequestHttpException('No confirmation token has been passed');
		}
		$userManager = $this->get('fos_user.user_manager');
		$user = $userManager->findUserByConfirmationToken($token);

		if(!$user){
			throw new BadRequestHttpException('The passed token could not be found. Maybe it expired.');
		}
		
		$user->setEnabled(true);
		$user->setConfirmationToken(null);
		$userManager->updateUser($user);

		$response = new JsonResponse();
		$event = new FilterUserResponseEvent($user, $request, $response);
		$dispatcher->dispatch(FOSUserEvents::REGISTRATION_CONFIRMED, $event);

		$response = $event->getResponse();

		return $response;
    }
}