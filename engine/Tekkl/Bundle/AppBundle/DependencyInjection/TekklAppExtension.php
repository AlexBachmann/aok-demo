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

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Loader;
use Symfony\Component\DependencyInjection\Reference;

/**
 * This is the class that loads and manages your bundle configuration.
 *
 * @link http://symfony.com/doc/current/cookbook/bundles/extension.html
 */
class TekklAppExtension extends Extension
{
    /**
     * {@inheritdoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $loader = new Loader\YamlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
        $loader->load('services.yml');

        if($config['dev_mode']){
            $loader->load('allow_dev_origins.yml');
        }
        $this->registerUrlService($config, $container);
        $this->registerMailer($config, $container);        
    }
    protected function registerUrlService($config, ContainerBuilder $container){
        $urlService = $container->register('tekkl.url.service', 'Tekkl\\Bundle\\AppBundle\\Service\\Url\\UrlService');
        $urlService->addMethodCall('setScheme', [($config['use_ssl']) ? 'https' : 'http']);
        $urlService->addMethodCall('setHost', [$config['host']]);
        if($config['path']){
            $urlService->addMethodCall('setBasePath', [$config['path']]);
        }
        $urlService->setShared(false);
    }
    protected function registerMailer($config, ContainerBuilder $container){
        $tekklMailer = $container->register('tekkl.mailer', 'Tekkl\\Bundle\\AppBundle\\Service\\Mail\\Mailer');
        $tekklMailer->addArgument(new Reference('mailer'));
        $tekklMailer->addArgument(new Reference('templating'));
        $tekklMailer->addArgument(new Reference('tekkl.url.service'));

        $tekklMailer->addArgument(
            $this->getMailerVars($config)
        );
        $tekklMailer->setShared(false);
    }
    protected function getMailerVars($config){
        $vars = [
            'appName' => $config['app_name'],
            'appEmail' => $config['app_email']
        ];
        return $vars;
    }
}
