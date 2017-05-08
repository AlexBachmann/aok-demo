<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\AppBundle\Service;

interface MailerInterface {
	public function setFrom($address, $name = null);
	public function setTo($address, $name = null);
	public function setCc($address, $name = null);
	public function setBcc($address, $name = null);
	public function setReplyTo($address, $name = null);
	public function setSubject($subject);
	public function setHtmlTemplate($template, $vars = []);
	public function setPlainTemplate($template, $vars = []);
	public function send();
}