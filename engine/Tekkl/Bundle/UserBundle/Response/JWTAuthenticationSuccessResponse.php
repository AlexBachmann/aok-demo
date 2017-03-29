<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Tekkl\Bundle\UserBundle\Response;

use Symfony\Component\HttpFoundation\JsonResponse;


final class JWTAuthenticationSuccessResponse extends JsonResponse
{
    /**
     * The Json Web Token.
     *
     * Immutable property.
     *
     * @var string
     */
    private $token;

    /**
     * @param string $token Json Web Token
     * @param array  $data  Extra data passed to the response
     */
    public function __construct($token, array $data = null)
    {
        $this->token = $token;

        parent::__construct($data);
    }

    /**
     * Sets the response data with the JWT included.
     *
     * {@inheritdoc}
     */
    public function setData($data)
    {
        parent::setData($data);
    }
}


