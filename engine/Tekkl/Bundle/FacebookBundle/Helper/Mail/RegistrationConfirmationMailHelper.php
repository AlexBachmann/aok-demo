<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\FacebookBundle\Helper\Mail;

use Tekkl\Bundle\AppBundle\Service\Mail\MailerInterface;
use Tekkl\Bundle\AppBundle\Service\Url\UrlServiceInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\User\UserInterface;

class RegistrationConfirmationMailHelper {

	private $passwordResetLinkTemplate = null;

	public function __construct(MailerInterface $mailer, UrlServiceInterface $urlService){
		$this->mailer = $mailer;
		$this->urlService = $urlService;
	}
	public function sendRegistrationConfirmationMail(UserInterface $user, Request $request){
		$locale = $request->getLocale();
		$this->mailer 
			->setTo($user->getEmail())
            ->setHtmlTemplate(sprintf('@TekklFacebook/Email/%s/registration.html', $locale))
            ->setPlainTemplate(sprintf('@TekklFacebook/Email/%s/registration.txt', $locale))
            ->loadVars([
                'username'  => $user->getUsername(),
                'email'     => $user->getEmail(),
                'passwordResetLink' => $this->getPasswordResetLink()
            ])
            ->send();
	}
	public function setPasswordResetLinkTemplate($template){
		$this->passwordResetLinkTemplate = $template;
	}
	public function getPasswordResetLinkTemplate(){
		if(!$this->passwordResetLinkTemplate){
			throw new \RuntimeException('No Password Reset Link template has been set.');
		}
		return $this->passwordResetLinkTemplate;
	}

	private function getPasswordResetLink(){
		$this->urlService->setPath($this->getPasswordResetLinkTemplate());
		return $this->urlService->toString();
	}
}