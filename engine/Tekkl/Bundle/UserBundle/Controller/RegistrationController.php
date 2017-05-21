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
use FOS\UserBundle\Event\GetResponseUserEvent;
use FOS\UserBundle\Form\Factory\FactoryInterface;
use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Model\UserManagerInterface;
use FOS\UserBundle\Event\FormEvent;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Tekkl\Bundle\UserBundle\Event\FilterUserResponseEvent;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class RegistrationController extends FOSRestController
{
	/**
     * @View()
     */
    public function postRegisterAction(Request $request)
    {
        /** @var $formFactory FactoryInterface */
        $formFactory = $this->get('fos_user.registration.form.factory');
        /** @var $userManager UserManagerInterface */
        $userManager = $this->get('fos_user.user_manager');
        /** @var $dispatcher EventDispatcherInterface */
        $dispatcher = $this->get('event_dispatcher');

        $user = $userManager->createUser();
        $user->setEnabled(true);

        $event = new GetResponseUserEvent($user, $request);
        $dispatcher->dispatch(FOSUserEvents::REGISTRATION_INITIALIZE, $event);

        if (null !== $event->getResponse()) {
            return $event->getResponse();
        }

        $form = $formFactory->createForm();
        $form->setData($user);

        $form->handleRequest($request);

        if ($form->isSubmitted()) {
            if ($form->isValid()) {
                $event = new FormEvent($form, $request);
                $dispatcher->dispatch(FOSUserEvents::REGISTRATION_SUCCESS, $event);

                $userManager->updateUser($user);

                if (null === $response = $event->getResponse()) {
                    $response = new JsonResponse();
                    if($user->isEnabled()){
                        $response->setData([
                            'user' => $user->getPublicData()
                        ]);
                    }else{
                        $response->setData([
                            'confirmation_required' => true
                        ]);
                    }
                }

                $event = new FilterUserResponseEvent($user, $request, $response);
                $dispatcher->dispatch(FOSUserEvents::REGISTRATION_COMPLETED, $event);

                $response = $event->getResponse();

                return $response;
            }
            $event = new FormEvent($form, $request);
            $dispatcher->dispatch(FOSUserEvents::REGISTRATION_FAILURE, $event);
			if (null !== $response = $event->getResponse()) {
                return $response;
            }
        }
    }
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