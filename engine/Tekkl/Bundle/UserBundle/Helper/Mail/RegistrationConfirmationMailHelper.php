<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\UserBundle\Helper\Mail;

use Tekkl\Bundle\AppBundle\Service\Mail\MailerInterface;
use Tekkl\Bundle\AppBundle\Service\Url\UrlServiceInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\UserInterface;

class RegistrationConfirmationMailHelper {

	private $registrationConfirmationLinkTemplate = null;
	private $passwordConfirmationLinkTemplate = null;

	public function __construct(MailerInterface $mailer, UrlServiceInterface $urlService){
		$this->mailer = $mailer;
		$this->urlService = $urlService;
	}
	public function sendRegistrationConfirmationMail($user, $request){
		$locale = $request->getLocale();
		$this->mailer   
			->setTo($user->getEmail())
            ->setHtmlTemplate(sprintf('@TekklUser/Email/%s/registration_confirmation.html', $locale))
            ->setPlainTemplate(sprintf('@TekklUser/Email/%s/registration_confirmation.txt', $locale))
            ->loadVars([
                'username'  		=> $user->getUsername(),
                'email'     		=> $user->getEmail(),
                'confirmationToken' => $user->getConfirmationToken(),
                'confirmationLink' 	=> $this->createConfirmationLink($user),
                'baseUrl'			=> $this->urlService->clear()->getBaseUrl()
            ])
            ->send();
	}
	public function setRegistrationConfirmationLinkTemplate($template){
		$this->registrationConfirmationLinkTemplate = $template;
	}
	public function getRegistrationConfirmationLinkTemplate(){
		if(!$this->registrationConfirmationLinkTemplate){
			throw new \RuntimeException('No Registratin Confirmation Link Template has been set.');
		}
		return $this->registrationConfirmationLinkTemplate;
	}
	private function createConfirmationLink(UserInterface $user){
		$this->urlService->clear()->setPath(sprintf($this->getRegistrationConfirmationLinkTemplate(), $user->getConfirmationToken()));
		return $this->urlService->toString();
	}
}