/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
export interface LoginStatusResponse {
	authResponse: null | {
		accessToken: string,
		expiresIn: number,
		signedRequest: string,
		userID: string
	},
	status: string
}
export interface ApiResponse {

}

export interface LoginOptions {
	scope?: string,
	return_scopes?: boolean
}
