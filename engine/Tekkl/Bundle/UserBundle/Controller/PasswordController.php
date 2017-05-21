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
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Tekkl\Bundle\UserBundle\Event\FilterUserResponseEvent;

class PasswordController extends FOSRestController
{
	/**
     * @View()
     */
    public function postPasswortResetAction(Request $request){
        $email = $request->get('email');
        /** @var $userManager UserManagerInterface */
        $userManager = $this->get('fos_user.user_manager');

        $user = $userManager->findUserByEmail($email);
        if(!$user){
        	throw new BadRequestHttpException('We could not find your email address');
        }
        $ttl = $this->container->getParameter('fos_user.resetting.retry_ttl');
        if (null !== $user && !$user->isPasswordRequestNonExpired($ttl)) {
            /** @var $tokenGenerator TokenGeneratorInterface */
            $tokenGenerator = $this->get('fos_user.util.token_generator');
            $user->setConfirmationToken($tokenGenerator->generateToken());
            $user->setPasswordRequestedAt(new \DateTime());
            $userManager->updateUser($user);

            $mailHelper = $this->get('tekkl.helper.password_reset_mail');
            $mailHelper->sendPasswordResetMail($user, $request);
            return ['email_sent' => true];
        }else{
            throw new HttpException(423, 'We have send you an email.');
        }
    }
    /**
     * @View()
     */
    public function postPasswordNewAction(Request $request){
        $token = $request->get('confirmation_token');
        /** @var $dispatcher EventDispatcherInterface */
        $dispatcher = $this->get('event_dispatcher');

        if(!$token){
            throw new BadRequestHttpException('no.token');
        }
        $userManager = $this->get('fos_user.user_manager');
        $user = $userManager->findUserByConfirmationToken($token);

        if(!$user){
            throw new BadRequestHttpException('unknown.token');
        }

        /** @var $formFactory FactoryInterface */
        $formFactory = $this->get('fos_user.resetting.form.factory');
        $form = $formFactory->createForm();
        $form->setData($user);
        $form->handleRequest($request);

        if ($form->isSubmitted()) {
            if ($form->isValid()) {
                $user->setConfirmationToken(null);
                $user->setPasswordRequestedAt(null);
                $userManager->updateUser($user);

                $response = new JsonResponse();
                $event = new FilterUserResponseEvent($user, $request, $response);
                $dispatcher->dispatch(FOSUserEvents::RESETTING_RESET_COMPLETED, $event);

                $response = $event->getResponse();

                return $response;
            }
            $errors = $form->getErrors();
            throw new BadRequestHttpException((string) $errors);
        }
        throw new \RuntimeException('Something went wrong');
    }
}