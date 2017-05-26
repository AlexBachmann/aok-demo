/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export abstract class JwtStorage {
	abstract storeJwtToken(jwt: string);
	abstract getJwtToken(): string;
	abstract deleteJwtToken();
}