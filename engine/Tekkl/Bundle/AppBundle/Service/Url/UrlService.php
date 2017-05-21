<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\AppBundle\Service\Url;

class UrlService implements UrlServiceInterface {

	private $scheme = null;
	private $host = null;
	private $user = null;
	private $password = null;
	private $port = 80;
	private $basePath = null;
	private $path = null;
	private $query = null;
	private $fragment = null;

	public function __construct($url = null){
		if($url){
			$parts = parse_url($url);
			if(isset($parts['scheme'])) $this->setScheme($parts['scheme']);
			if(isset($parts['user'])) $this->setUser($parts['user']);
			if(isset($parts['pass'])) $this->setPassword($parts['pass']);
			if(isset($parts['host'])) $this->setHost($parts['host']);
			if(isset($parts['port'])) $this->setPort($parts['port']);
			if(isset($parts['path'])) $this->setPath($parts['path']);
			if(isset($parts['query'])) $this->setQuery($parts['query']);
			if(isset($parts['fragment'])) $this->setFragment($parts['fragment']);
		}
	}
	public function setScheme($scheme){
		$this->scheme = $scheme;
	}
	public function getScheme(){
		if(!$this->scheme){
			throw new \RuntimeException('No scheme has been configured for this url');
		}
		return $this->scheme;
	}
	public function setUser($user){
		$this->user = $user;
	}
	public function getUser(){
		return $this->user;
	}
	public function setPassword($password){
		$this->password = $password;
	}
	public function getPassword(){
		return $this->password;
	}
	public function setHost($host){
		if($host) $host = trim($host, '/');
		$this->host = $host;
	}
	public function getHost(){
		if(!$this->host){
			throw new \RuntimeException('No host has been configured for this url');
		}
		return $this->host;
	}
	public function setPort($port){
		$this->port = $port;
	}
	public function getPort(){
		return $this->port;
	}
	public function setBasePath($basePath){
		if($basePath) $basePath = '/' . trim($basePath, '/');
		$this->basePath = $basePath;
	}
	public function getBasePath(){
		return $this->basePath;
	}
	public function getBaseUrl(){
		$url = '';
		$url .= $this->getScheme() . '://';
		if($this->getUser() || $this->getPassword()){
			$url .= $this->getUser() . ':' . $this->getPassword() . '@';
		}
		$url .= $this->getHost();
		if($this->getPort() != 80){
			$url .= ':' . $this->getPort();
		}
		$url .= $this->getBasePath();

		return $url;
	}
	public function setPath($path){
		if($path) $path = '/' . trim($path, '/');
		$this->path = $path;
	}
	public function getPath(){
		return $this->path;
	}
	public function setQuery($query){
		$this->query = $query;
	}
	public function getQuery(){
		return $this->query;
	}
	public function setFragment($fragment){
		$this->fragment = $fragment;
	}
	public function getFragment(){
		return $this->fragment;
	}
	public function clear($all = false){
		if($all){
			$this->setScheme(null);
			$this->setUser(null);
			$this->setPassword(null);
			$this->setHost(null);
			$this->setBasePath(null);
		}
		$this->setPath(null);
		$this->setQuery(null);
		$this->setFragment(null);

		return $this;
	}
	public function toString($absolute = true){
		$url = '';
		if($absolute){
			$url .= $this->getScheme() . '://';
			if($this->getUser() || $this->getPassword()){
				$url .= $this->getUser() . ':' . $this->getPassword() . '@';
			}
			$url .= $this->getHost();
			if($this->getPort() != 80){
				$url .= ':' . $this->getPort();
			}
		}
		$url .= $this->getBasePath() . $this->getPath();
		if($this->getQuery()){
			$url .= '?' . $this->getQuery();
		}
		if($this->getFragment()){
			$url .= '#' . $this->getFragment();
		}
		return $url;
	}
	public function __toString(){
		return $this->toString(true);
	}
}