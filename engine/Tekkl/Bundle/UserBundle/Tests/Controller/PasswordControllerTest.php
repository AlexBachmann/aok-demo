<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace Tekkl\Bundle\UserBundle\Tests\Controller;

use Tekkl\Bundle\AppBundle\Tests\WebTestCase;

class PasswordControllerTest extends WebTestCase
{
    public static function setUpBeforeClass(){
        self::runCommand('doctrine:database:create');
        self::runCommand('doctrine:schema:update --force');
        self::runCommand('doctrine:fixtures:load -n');
    }
    public function testMailIsSentAndContentIsOk()
    {
        $client = static::createClient();

        // Enable the profiler for the next request (it does nothing if the profiler is not available)
        $client->enableProfiler();

        $payload = $this->getPasswordResetPayload();
        $crawler = $client->request('POST', '/api/user/passwort/reset', [], [], [], json_encode($payload));
        $response = json_decode($client->getResponse()->getContent());
      
        $this->assertTrue($response->email_sent);

        $mailCollector = $client->getProfile()->getCollector('swiftmailer');
        $devDeliveryAddress = $client->getContainer()->getParameter('mailer_dev_delivery_address');

        // Check that an email was sent
        $this->assertEquals(1, $mailCollector->getMessageCount());

        $collectedMessages = $mailCollector->getMessages();
        $message = $collectedMessages[0];

        // Asserting email data
        $this->assertInstanceOf('Swift_Message', $message);
        $this->assertRegExp('/Reset your password/', $message->getSubject());
        // Depending on the environment we are in, the message receiver can either be the true receiver
        // or the development delivery address
        $this->assertTrue(($payload['email'] == key($message->getTo())) || ($devDeliveryAddress == key($message->getTo())));
        $this->assertRegExp(
            '/(.+\/user\/new-password\/([a-zA-Z0-9_-]+))/',
            $message->getBody()
        );
        preg_match('/(.+\/user\/new-password\/([a-zA-Z0-9_-]+))/', $message->getBody(), $matches);

        return $matches[2];
    }
    /**
     * @depends testMailIsSentAndContentIsOk
     */
    public function testNewPasswordForm($token){
    	$client = static::createClient();
    	$payload = $this->createPasswordResetPayload($token);
    	$crawler = $client->request('POST', '/api/user/password/new', [], [], [], json_encode($payload));
    	$response = json_decode($client->getResponse()->getContent());
    	$this->assertTrue(isset($response->user));
    }
    private function getPasswordResetPayload(){
    	// This user is created by executing bin/console doctrine:fixtures:load -n --env=test
    	$payload = [
    		'email'		=> 'password_reset@test.de'
    	];
    	return $payload;
    }
    private function createPasswordResetPayload($token){
    	$payload = [
    		'reset_form' => [
    			'plainPassword' => [
    				'first' => 'NewPassword1',
    				'second' => 'NewPassword1'
    			]
    		],
    		'confirmation_token' => $token
    	];
    	return $payload;
    }
}