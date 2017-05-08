<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace Tekkl\Bundle\FacebookBundle\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations\View;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Security\Core\User\UserInterface;
use Tekkl\Bundle\FacebookBundle\Events;
use Tekkl\Bundle\FacebookBundle\Event\FacebookAuthenticationEvent;
use Tekkl\Bundle\UserBundle\Event\FilterUserResponseEvent;
use FOS\UserBundle\FOSUserEvents;

class LoginController extends FOSRestController
{
	/**
     * @View()
     */
    public function postLoginAction(Request $request){

        $user =  $this->getSystemUserFromFacebookVars($request);

        /** @var $dispatcher EventDispatcherInterface */
        $dispatcher = $this->get('event_dispatcher');
        $response = new JsonResponse();
        $event = new FacebookAuthenticationEvent($user, $request, $response);
        $dispatcher->dispatch(Events::AUTHENTICATION_SUCCESS, $event);

        $response = $event->getResponse();

        return $response;
    }

    private function getSystemUserFromFacebookVars(Request $request){
    	$vars = $request->request->all();
        $this->checkRequestVars($vars);

        $userManager = $this->get('tekkl_facebook.user_manager');
        $facebookUser = $userManager->findUserByFacebookId($vars['id']);

        if($facebookUser){
        	return $facebookUser->getUser();
        }

        // No system user is attached to this facebook user yet
        $user = $userManager->findUserByEmail($vars['email']);
        if(!$user){
            $username = $userManager->generateUsernameFromFacebookName($vars['name']);
            $user = $userManager->createSystemUser($username, $vars['email']);

            /** @var $dispatcher EventDispatcherInterface */
            $dispatcher = $this->get('event_dispatcher');
            $response = new JsonResponse();
            $event = new FilterUserResponseEvent($user, $request, $response);
            $dispatcher->dispatch(FOSUserEvents::REGISTRATION_COMPLETED, $event);
            $this->sendRegistrationEmail($user, $request->getLocale());
        }

        $facebookUser = $userManager->createUser();
        $facebookUser->setFacebookUserId($vars['id']);
        $userManager->attachFacebookUserToSystemUser($user, $facebookUser);

        return $user;
    }
    private function checkRequestVars($vars){
    	if(!isset($vars['id']) || !isset($vars['email']) || !isset($vars['name'])){
    		throw new BadRequestHttpException('The passed Facebook user data is not valid');
    	}
    }
    private function sendRegistrationEmail(UserInterface $user, $locale){
        $mail = $this->get('tekkl.mailer');
        $mail
            ->setTo($user->getEmail())
            ->setHtmlTemplate(sprintf('@TekklFacebook/Email/%s/registration.html', $locale))
            ->setPlainTemplate(sprintf('@TekklFacebook/Email/%s/registration.txt.html', $locale))
            ->loadVars(
                [
                    'username'  => $user->getUsername(),
                    'email'     => $user->getEmail()
                ])
            ->send();
    }
}