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
		$this->createSimpleUser($manager);
        $this->createAdminUser($manager);
        $this->createSuperAdminUser($manager);
        $this->createPasswordResetUser($manager);
    }
    protected function getEnvironments(){
        return array('dev', 'test');
    }
    private function createSimpleUser(ObjectManager $manager){
        $userManager = $this->container->get('fos_user.user_manager');
        $user = $userManager->createUser();
        $user->setUsername('user');
        $user->setEmail('user@test.de');
        $user->setPlainPassword('password');
        $user->setEnabled(true);

        $userManager->updateUser($user);
    }
    private function createAdminUser(ObjectManager $manager){
        $userManager = $this->container->get('fos_user.user_manager');
        $user = $userManager->createUser();
        $user->setUsername('admin');
        $user->setEmail('admin@test.de');
        $user->setPlainPassword('password');
        $user->addRole('ROLE_ADMIN');
        $user->setEnabled(true);

        $userManager->updateUser($user);
    }
    private function createSuperAdminUser(ObjectManager $manager){
        $userManager = $this->container->get('fos_user.user_manager');
        $user = $userManager->createUser();
        $user->setUsername('superadmin');
        $user->setEmail('superadmin@test.de');
        $user->setPlainPassword('password');
        $user->addRole('ROLE_SUPER_ADMIN');
        $user->setEnabled(true);

        $userManager->updateUser($user);
    }
    private function createPasswordResetUser(ObjectManager $manager){
        $userManager = $this->container->get('fos_user.user_manager');
        $user = $userManager->createUser();
        $user->setUsername('password_reset_user');
        $user->setEmail('password_reset@test.de');
        $user->setPlainPassword('old_password');
        $user->setEnabled(true);

        $userManager->updateUser($user);
    }
}