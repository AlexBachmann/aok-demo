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

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class RegistrationControllerTest extends WebTestCase
{
    public function testMailIsSentAndContentIsOk()
    {
        $client = static::createClient();

        // Enable the profiler for the next request (it does nothing if the profiler is not available)
        $client->enableProfiler();

        $payload = $this->getUserRegistrationPayload();
        $crawler = $client->request('POST', '/api/user/register', [], [], [], json_encode($payload));
        $response = json_decode($client->getResponse()->getContent());
        $this->assertTrue($response->confirmation_required);

        $mailCollector = $client->getProfile()->getCollector('swiftmailer');

        // Check that an email was sent
        $this->assertEquals(1, $mailCollector->getMessageCount());

        $collectedMessages = $mailCollector->getMessages();
        $message = $collectedMessages[0];
        $devDeliveryAddress = $client->getContainer()->getParameter('mailer_dev_delivery_address');

        // Asserting email data
        $this->assertInstanceOf('Swift_Message', $message);
        $this->assertRegExp('/Your new .+ account has been created/', $message->getSubject());
        
        // Depending on the environment we are in, the message receiver can either be the true receiver
        // or the development delivery address
        $this->assertTrue(($payload['email'] == key($message->getTo())) || ($devDeliveryAddress == key($message->getTo())));
        $this->assertRegExp(
            '/(.+\/user\/confirm\/(.+))/',
            $message->getBody()
        );
        preg_match('/(.+\/user\/confirm\/([a-zA-Z0-9_-]+))/', $message->getBody(), $matches);

        return $matches[2];
    }
    /**
     * @depends testMailIsSentAndContentIsOk
     */
    public function testConfirmationLink($token){
    	$client = static::createClient();
    	$crawler = $client->request('POST', '/api/user/confirm', [], [], [], json_encode(['token' => $token]));
    	$response = json_decode($client->getResponse()->getContent());
    	$this->assertTrue(isset($response->user));
    }
    private function getUserRegistrationPayload(){
    	$rand = preg_replace('/[^a-z]+/', '', base_convert(rand(10000000, 100000000), 10, 32));
    	$user = [
    		'username' 	=> 'user' . $rand,
    		'email'		=> 'email' . $rand . '@test.de',
    		'plainPassword' => [
    			'first' => 'TestPassword1',
    			'second' => 'TestPassword1'
    		]
    	];
    	return $user;
    }
}