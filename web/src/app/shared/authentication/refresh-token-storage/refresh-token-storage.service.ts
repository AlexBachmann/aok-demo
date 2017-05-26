/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export abstract class RefreshTokenStorage {
	abstract storeRefreshToken(token: string);
	abstract getRefreshToken(): string;
	abstract deleteRefreshToken();
}