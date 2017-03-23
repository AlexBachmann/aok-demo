<?php 
/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

use FOSUserBundle\Security\LoginMangerInterface;

class LoginManager implements LoginMangerInterface {
	/**
     * @var TokenStorageInterface
     */
    private $tokenStorage;

    /**
     * @var UserCheckerInterface
     */
    private $userChecker;

    /**
     * @var SessionAuthenticationStrategyInterface
     */
    private $sessionStrategy;

    /**
     * @var RequestStack
     */
    private $requestStack;

    /**
     * @var RememberMeServicesInterface
     */
    private $rememberMeService;

    /**
     * LoginManager constructor.
     *
     * @param TokenStorageInterface                  $tokenStorage
     * @param UserCheckerInterface                   $userChecker
     * @param SessionAuthenticationStrategyInterface $sessionStrategy
     * @param RequestStack                           $requestStack
     * @param RememberMeServicesInterface|null       $rememberMeService
     */
    public function __construct(TokenStorageInterface $tokenStorage, UserCheckerInterface $userChecker,
                                SessionAuthenticationStrategyInterface $sessionStrategy,
                                RequestStack $requestStack,
                                RememberMeServicesInterface $rememberMeService = null
    ) {
        $this->tokenStorage = $tokenStorage;
        $this->userChecker = $userChecker;
        $this->sessionStrategy = $sessionStrategy;
        $this->requestStack = $requestStack;
        $this->rememberMeService = $rememberMeService;
    }

    /**
     * {@inheritdoc}
     */
    final public function logInUser($firewallName, UserInterface $user, Response $response = null)
    {
        $this->userChecker->checkPreAuth($user);

        $token = $this->createToken($firewallName, $user);
        $request = $this->requestStack->getCurrentRequest();

        if (null !== $request) {
            $this->sessionStrategy->onAuthentication($request, $token);

            if (null !== $response && null !== $this->rememberMeService) {
                $this->rememberMeService->loginSuccess($request, $response, $token);
            }
        }

        $this->tokenStorage->setToken($token);
    }

    /**
     * @param string        $firewall
     * @param UserInterface $user
     *
     * @return UsernamePasswordToken
     */
    protected function createToken($firewall, UserInterface $user)
    {
        return new UsernamePasswordToken($user, null, $firewall, $user->getRoles());
    }
}