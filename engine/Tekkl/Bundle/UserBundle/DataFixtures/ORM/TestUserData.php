<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */


namespace Tekkl\Bundle\UserBundle\Tests\DataFixtures\ORM;

use Tekkl\Bundle\AppBundle\Tests\DataFixtures\TestEnvDataFixture;
use Doctrine\Common\Persistence\ObjectManager;
use Tekkl\Bundle\UserBundle\Entity\User;

class TestUserData extends TestEnvDataFixture {
	public function doLoad(ObjectManager $manager){
		$userManager = $this->container->get('fos_user.user_manager');
        $userAdmin = $userManager->createUser();
        $userAdmin->setUsername('admin');
        $userAdmin->setEmail('admin@test.de');
        $userAdmin->setPlainPassword('test');
        $userAdmin->setEnabled(true);

        $userManager->updateUser($userAdmin);
    }
    protected function getEnvironments(){
        return array('dev', 'test');
    }
}