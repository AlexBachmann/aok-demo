<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
namespace Tekkl\Bundle\FacebookBundle\DependencyInjection;

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
        $rootNode = $treeBuilder->root('tekkl_facebook');

        // Here you should define the parameters that are allowed to
        // configure your bundle. See the documentation linked above for
        // more information on that topic.

        $rootNode
            ->addDefaultsIfNotSet()
            ->children()
	            ->scalarNode('appId')->isRequired()->cannotBeEmpty()->end()
	            ->scalarNode('appSecret')->isRequired()->cannotBeEmpty()->end()
	            ->scalarNode('version')->defaultValue('v2.9')->end()
	            ->scalarNode('facebook_user_class')->defaultValue('\\Tekkl\\Bundle\\FacebookBundle\\Entity\\FacebookUser')->end()
                ->arrayNode('registration')
                    ->addDefaultsIfNotSet()
                    ->children()
                        ->scalarNode('password_reset_link_template')->defaultValue('/user/reset-password')->end() 
                    ->end()
                ->end()
	        ->end();
        return $treeBuilder;
    }
}