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

class PasswordResetMailHelper {

	private $passwordConfirmationLinkTemplate = null;

	public function __construct(MailerInterface $mailer, UrlServiceInterface $urlService){
		$this->mailer = $mailer;
		$this->urlService = $urlService;
	}
	public function sendPasswordResetMail(UserInterface $user, Request $request){
		$locale = $request->getLocale();
		$this->mailer 
			->setTo($user->getEmail())
            ->setHtmlTemplate(sprintf('@TekklUser/Email/%s/password_reset.html', $locale))
            ->setPlainTemplate(sprintf('@TekklUser/Email/%s/password_reset.txt', $locale))
            ->loadVars([
                'username'  => $user->getUsername(),
                'email'     => $user->getEmail(),
                'confirmationToken' => $user->getConfirmationToken(),
                'confirmationLink' => $this->createConfirmationLink($user)
            ])
            ->send();
	}
	public function setPasswordResetLinkTemplate($template){
		$this->passwordConfirmationLinkTemplate = $template;
	}
	public function getPasswordResetLinkTemplate(){
		if(!$this->passwordConfirmationLinkTemplate){
			throw new \RuntimeException('No Password Reset Link template has been set.');
		}
		return $this->passwordConfirmationLinkTemplate;
	}

	private function createConfirmationLink(UserInterface $user){
		$this->urlService->setPath(sprintf($this->getPasswordResetLinkTemplate(), $user->getConfirmationToken()));
		return $this->urlService->toString();
	}
}