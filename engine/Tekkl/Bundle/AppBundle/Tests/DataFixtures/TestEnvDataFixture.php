<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace Tekkl\Bundle\AppBundle\Tests\DataFixtures;

use Doctrine\Common\Persistence\ObjectManager;

/**
 * Loads data only on "test".
 */
abstract class TestEnvDataFixture extends AbstractDataFixture {
    /**
     * @override
     */
    protected function getEnvironments(){
        return array('test');
    }
}