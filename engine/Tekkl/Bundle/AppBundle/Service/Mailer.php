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

class Mailer implements MailerInterface {

	private $from = [];
	private $to = [];
	private $cc = [];
	private $bcc = [];
	private $replyTo = [];
	private $subject = '';
	private $htmlTemplate = '';
	private $htmlBody = '';
	private $plainTemplate = '';
	private $plainBody = '';
	private $vars = [];

	public function __construct($mailer, $viewRenderer, $defaultVars){
		$this->mailer = $mailer;
		$this->viewRenderer = $viewRenderer;
		$this->defaultVars = $defaultVars;

		$this->loadDefaultVars();
	}
	/**
	 * Set the address and name of the sender of the mail
	 * 
	 * @param mixed $address either a string containing the email, or a list / array of 
	 * email and name tupels ([[ 'email' => 'info@exmaple.com', 'name' => 'Max Mustermann'], etc. ])
	 * @param string $name If the address is a string containg an email, this will be used to 
	 * associate the name to the email
	 */
	public function setFrom($address, $name = null){
		$this->setAddress('from', $address, $name);

		return $this;
	}
	/**
	 * Set the address and name of the recipients of the mail
	 * 
	 * @param mixed $address either a string containing the email, or a list / array of 
	 * email and name tupels ([[ 'email' => 'info@exmaple.com', 'name' => 'Max Mustermann'], etc. ])
	 * @param string $name If the address is a string containg an email, this will be used to 
	 * associate the name to the email
	 */
	public function setTo($address, $name = null){
		$this->setAddress('to', $address, $name);

		return $this;
	}
	/**
	 * Set the address and name of the CC recipients of the mail
	 * 
	 * @param mixed $address either a string containing the email, or a list / array of 
	 * email and name tupels ([[ 'email' => 'info@exmaple.com', 'name' => 'Max Mustermann'], etc. ])
	 * @param string $name If the address is a string containg an email, this will be used to 
	 * associate the name to the email
	 */
	public function setCc($address, $name = null){
		$this->setAddress('cc', $address, $name);

		return $this;
	}
	/**
	 * Set the address and name of the BCC recipients of the mail
	 * 
	 * @param mixed $address either a string containing the email, or a list / array of 
	 * email and name tupels ([[ 'email' => 'info@exmaple.com', 'name' => 'Max Mustermann'], etc. ])
	 * @param string $name If the address is a string containg an email, this will be used to 
	 * associate the name to the email
	 */
	public function setBcc($address, $name = null){
		$this->setAddress('bcc', $address, $name);

		return $this;
	}
	/**
	 * Set the address and name of the replyTo Address
	 * 
	 * @param mixed $address either a string containing the email, or a list / array of 
	 * email and name tupels ([[ 'email' => 'info@exmaple.com', 'name' => 'Max Mustermann'], etc. ])
	 * @param string $name If the address is a string containg an email, this will be used to 
	 * associate the name to the email
	 */
	public function setReplyTo($address, $name = null){
		$this->setAddress('replyTo', $address, $name);

		return $this;
	}
	protected function setAddress($type, $address, $name = null){
		if(is_array($address)){
			foreach($address as $entry){
				if(!isset($address['email'])){
					throw new \InvalidArgumentException('If the $address argument is an array it must contain a list of entries with email and optional name information. [ ["email" => "info@example.com", "name" => "Max Mustermann"], etc. ]', 500);
				}
				if(!isset($address['name'])){
					$address['name'] = null;
				}
			}
			$this->$type = $address;
			return $this;
		}
		if(!is_string($address)){
			throw new \InvalidArgumentException('The $address argument must either be a list of  address information or a string containing an email', 500);
		}
		$this->$type = [[ 'email' => $address, 'name' => $name ]];

		return $this;
	}
	/**
	 * Sets the Subject of the email
	 * 
	 * @param string $subject The email subject
	 */
	public function setSubject($subject){
		$this->subject = $subject;

		return $this;
	}
	/**
	 * Sets the (TWIG) template for HTML version of the email
	 *
	 * @see  http://symfony.com/doc/current/templating/namespaced_paths.html
	 * 
	 * @param string $template The Twig template path
	 * @param array  $vars     An optional array of vars that should be associated with the template
	 */
	public function setHtmlTemplate($template, $vars = []){
		$this->htmlTemplate = $template;
		$this->loadVars($vars);

		return $this;
	}
	/**
	 * Sets the (TWIG) template for Plain Text version of the email
	 *
	 * @see  http://symfony.com/doc/current/templating/namespaced_paths.html
	 * 
	 * @param string $template The Twig template path
	 * @param array  $vars     An optional array of vars that should be associated with the template
	 */
	public function setPlainTemplate($template, $vars = []){
		$this->plainTemplate = $template;
		$this->loadVars($vars);

		return $this;
	}
	/**
	 * Sets a variable in the template's vars stack
	 * 
	 * @param string $key   The name of the variable
	 * @param mixed $value The value of the variable
	 */
	public function setVar($key, $value){
		$this->vars[$key] = $value;

		return $this;
	}
	/**
	 * Adds variable definitions to the template vars stack
	 *
	 * Previously added variables are not deleted, but overwritten, if they are stored under
	 * the same keys
	 * 
	 * @param  array $vars associate array containing variable defintions ['key' => 'value', etc.]
	 * @return void
	 */
	public function loadVars($vars){
		$this->vars = array_merge($this->vars, $vars);

		return $this;
	}
	/**
	 * Returns the current state of loaded template variables
	 * 
	 * @return array current state of loaded variables
	 */
	public function getVars(){
		return $this->vars;
	}
	/**
	 * Performs a series of checks and then sends the message via the configured transport method
	 * 
	 * @return int number of successfully send messages
	 */
	public function send(){
		$message = $this->createMessage();
		$this->mailer->send($message);

		return $this;
	}
	/**
	 * Creates a Swift_Message object and attaches the corresponding information
	 * 
	 * @return Swift_Message $message
	 */
	public function createMessage(){
		$this->renderTemplates();
		$this->parseSubject();
		$this->check();

		$message = \Swift_Message::newInstance();

		foreach($this->from as $address){
			$message->addFrom($address['email'], $address['name']);
		}
		foreach($this->to as $address){
			$message->addTo($address['email'], $address['name']);
		}
		foreach($this->cc as $address){
			$message->addCc($address['email'], $address['name']);
		}
		foreach($this->bcc as $address){
			$message->addBcc($address['email'], $address['name']);
		}
		foreach($this->replyTo as $address){
			$message->addReplyTo($address['email'], $address['name']);
		}

		$message->setSubject($this->subject);
        
        if($this->htmlBody){
        	if($message->getBody()){
        		$message->addPart($this->htmlBody, 'text/html');
        	}else{
        		$message->setBody($this->htmlBody, 'text/html');
        	}
        }
        if($this->plainBody){
        	if($message->getBody()){
        		$message->addPart($this->plainBody, 'text/plain');
        	}else{
        		$message->setBody($this->plainBody, 'text/plain');
        	}
        }

        return $message;
	}
	public function renderTemplates(){
		if($this->htmlTemplate){
			$this->htmlBody = $this->viewRenderer->render($this->htmlTemplate, $this->getVars());
		}
		if($this->plainTemplate){
			$this->plainBody = $this->viewRenderer->render($this->plainTemplate, $this->getVars());
		}

		return $this;
	}
	protected function parseSubject(){
		$regex = '/<!--SUBJECT:([^-->]+)-->/';
		if(!$this->subject){
			// First try to retrieve subject of htmlBody
			if(!preg_match($regex, $this->htmlBody, $matches)) preg_match($regex, $this->plainBody, $matches);
			if($matches && isset($matches[1])){
				$this->subject = trim($matches[1]);
			}
		}

		// Eliminate the subject from the body
		$this->htmlBody = preg_replace($regex, '', $this->htmlBody);
		$this->plainBody = preg_replace($regex, '', $this->plainBody);
	}
	public function check(){
		if(count($this->from) < 1){
			$this->loadDefaultSenderData();
		}
		if(count($this->to) < 1){
			throw new \RuntimeException('No recipients have been set for the email message', 500);
		}
		if(!$this->subject){
			throw new \RuntimeException('No subject has been set for the email message', 500);
		}
		if(!$this->htmlBody && !$this->plainBody){
			throw new \RuntimeException('This email has neither a plain text nor a html body', 500);
		}

		return $this;
	}
	protected function loadDefaultSenderData(){
		$this->from = [['name' => $this->defaultVars['appName'], 'email' => $this->defaultVars['appEmail']]];
	}
	protected function loadDefaultVars(){
		$this->loadVars($this->defaultVars);
	}
}