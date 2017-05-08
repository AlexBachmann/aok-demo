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

        $this->registerMailer($config, $container);        
    }
    protected function registerMailer($config, ContainerBuilder $container){
        $tekklMailer = $container->register('tekkl.mailer', 'Tekkl\\Bundle\\AppBundle\\Service\\Mailer');
        $tekklMailer->addArgument(new Reference('mailer'));
        $tekklMailer->addArgument(new Reference('templating'));

        $tekklMailer->addArgument(
            $this->getMailerVars($config)
        );
        $tekklMailer->addArgument($config['app_name']);
        $tekklMailer->setShared(false);
    }
    protected function getMailerVars($config){
        $vars = [
            'appName' => $config['app_name'],
            'appEmail' => $config['app_email'],
            'baseUrl' => $this->getBaseUrl($config),
            'appHost' => $this->getHost($config),
            'appSchema' => $this->getSchema($config),
            'appPath' => $this->getPath($config),
            'useSsl' => $config['use_ssl']
        ];
        return $vars;
    }
    protected function getBaseUrl($config){
        $schema = $this->getSchema($config);
        $host = $this->getHost($config);
        $path = $this->getPath($config);

        return $schema . $host . $path;
    }
    protected function getSchema($config){
        if($config['use_ssl']){
            return 'https://';
        }
        return 'http://';
    }
    protected function getHost($config){
        $regex = '/http[s]?:\/\//';
        if(preg_match($regex, $config['host'])){
           $config['host'] = preg_replace($regex, '', $config['host']);
        }
        return trim($config['host'], '/');
    }
    protected function getPath($config){
        return rtrim($config['path'], '/');
    }
}
