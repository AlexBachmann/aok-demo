<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\AppBundle\Util\Inflector;

use FOS\RestBundle\Inflector\InflectorInterface;

/**
 * Inflector class
 *
 */
class RestInflector implements InflectorInterface
{
    public function pluralize($word)
    {
        // Don't pluralize
        return $word;
    }
}