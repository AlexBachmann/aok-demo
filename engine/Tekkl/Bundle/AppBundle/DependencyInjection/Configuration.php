<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\AppBundle\DependencyInjection;

use Symfony\Component\Config\Definition\Builder\TreeBuilder;
use Symfony\Component\Config\Definition\ConfigurationInterface;

/**
 * This is the class that validates and merges configuration from your app/config files.
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/configuration.html}
 */
class Configuration implements ConfigurationInterface
{
    /**
     * {@inheritdoc}
     */
    public function getConfigTreeBuilder()
    {
        $treeBuilder = new TreeBuilder();
        $rootNode = $treeBuilder->root('tekkl_app');

        $rootNode
            ->addDefaultsIfNotSet()
            ->children()
                ->scalarNode('app_name')->isRequired()->cannotBeEmpty()->end()
                ->scalarNode('app_email')->isRequired()->cannotBeEmpty()->end()
                ->scalarNode('host')->isRequired()->cannotBeEmpty()->end()
                ->scalarNode('path')->defaultValue('')->end()
                ->scalarNode('use_ssl')->defaultValue(false)->end()
                ->scalarNode('dev_mode')->defaultValue(false)->end()
            ->end();

        return $treeBuilder;
    }
}