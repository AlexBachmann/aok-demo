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

interface UrlServiceInterface {
	public function setScheme($scheme);
	public function getScheme();
	public function setUser($user);
	public function getUser();
	public function setPassword($password);
	public function getPassword();
	public function setHost($host);
	public function getHost();
	public function setPort($port);
	public function getPort();
	public function setBasePath($basePath);
	public function getBasePath();
	public function getBaseUrl();
	public function setPath($path);
	public function getPath();
	public function setQuery($query);
	public function getQuery();
	public function setFragment($fragment);
	public function getFragment();
}