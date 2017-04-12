<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\AppBundle\Exception\Form;

use Symfony\Component\Form\FormInterface;

use Symfony\Component\Form\Exception\ExceptionInterface;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class FormErrorException extends BadRequestHttpException implements ExceptionInterface {
	private $errors = [];
	private $form;
	public function __construct(FormInterface $form){
		$this->form = $form;
		$this->errors = $form->getErrors(true);

		$message = implode("|", array_map(function($error){ return $error->getMessageTemplate(); }, iterator_to_array($this->errors)));

		parent::__construct($message);
	}
}