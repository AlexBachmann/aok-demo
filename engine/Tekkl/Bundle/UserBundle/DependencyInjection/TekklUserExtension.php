<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\UserBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Extension\PrependExtensionInterface;
use Symfony\Component\DependencyInjection\Loader;

/**
 * This is the class that loads and manages your bundle configuration.
 *
 * @link http://symfony.com/doc/current/cookbook/bundles/extension.html
 */
class TekklUserExtension extends Extension implements PrependExtensionInterface {
    public function prepend(ContainerBuilder $container){
        $this->importFromLexikJwtConfig($container);
        $this->prependDoctrineConfig($container);
    }
    public function load(array $configs, ContainerBuilder $container){
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $loader = new Loader\YamlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
        $loader->load('services.yml');
        $this->remapParametersNamespaces($config['jwt'], $container, [
            'cookie' => 'tekkl_user.jwt.cookie.%s',
            'authorization_header' => 'tekkl_user.jwt.authorization_header.%s',
        ]);
    }

    /**
     * @param array            $config
     * @param ContainerBuilder $container
     * @param array            $map
     */
    protected function remapParameters(array $config, ContainerBuilder $container, array $map)
    {
        foreach ($map as $name => $paramName) {
            if (array_key_exists($name, $config)) {
                $container->setParameter($paramName, $config[$name]);
            }
        }
    }

    /**
     * @param array            $config
     * @param ContainerBuilder $container
     * @param array            $namespaces
     */
    protected function remapParametersNamespaces(array $config, ContainerBuilder $container, array $namespaces)
    {
        foreach ($namespaces as $ns => $map) {
            if ($ns) {
                if (!array_key_exists($ns, $config)) {
                    continue;
                }
                $namespaceConfig = $config[$ns];
            } else {
                $namespaceConfig = $config;
            }
            if (is_array($map)) {
                $this->remapParameters($namespaceConfig, $container, $map);
            } else {
                foreach ($namespaceConfig as $name => $value) {
                    $container->setParameter(sprintf($map, $name), $value);
                }
            }
        }
    }
    private function importFromLexikJwtConfig(ContainerBuilder $container){
        $lexikConfig = $container->getExtensionConfig('lexik_jwt_authentication');
        $lexikConfig = $container->getParameterBag()->resolveValue($lexikConfig);
        $lexitConfiguration = new \Lexik\Bundle\JWTAuthenticationBundle\DependencyInjection\Configuration();
        $config = $this->processConfiguration($lexitConfiguration, $lexikConfig);
        $tekklUserPrependConfig = array(
            'jwt' => array(
                'authorization_header' => array(
                    'prefix' => $config['token_extractors']['authorization_header']['prefix'],
                    'name' => $config['token_extractors']['authorization_header']['name']
                )
            )
        );
        $container->prependExtensionConfig('tekkl_user', $tekklUserPrependConfig);
    }
    private function prependDoctrineConfig(ContainerBuilder $container){
        $fosUserConfig = $container->getExtensionConfig('fos_user');
        $fosUserConfig = $container->getParameterBag()->resolveValue($fosUserConfig);
        $fosUserConfiguration = new \FOS\UserBundle\DependencyInjection\Configuration();
        $config = $this->processConfiguration($fosUserConfiguration, $fosUserConfig);
        $doctrinePrependConfig = array(
            'orm' => [
                'resolve_target_entities' => [
                    'Symfony\\Component\\Security\\Core\User\\UserInterface' => $config['user_class']
                ]
            ]
        );
        $container->prependExtensionConfig('doctrine', $doctrinePrependConfig);
    }
}
