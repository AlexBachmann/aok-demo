<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\UserBundle\EventListener\Registration;

use FOS\UserBundle\Event\FormEvent;
use Tekkl\Bundle\AppBundle\Exception\Form\FormErrorException;

class RegistrationFailureFormException {
	public function onRegistrationFailure(FormEvent $event){
		$form = $event->getForm();
		throw new FormErrorException($form);
	}
}