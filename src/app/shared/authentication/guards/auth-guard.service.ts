/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Injectable }       from '@angular/core';
import {
	CanActivate, Router,
	ActivatedRouteSnapshot,
	RouterStateSnapshot
}                           from '@angular/router';
import { AuthenticationService }      from '../authentication.service';
import { LoginUrlResolver } from '../../url-resolver/login-url-resolver';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(protected authService: AuthenticationService, protected router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		let url: string = state.url;

		if(this.check(url)){
			return true;
		}else{
			// Store the attempted URL for redirecting
 			this.authService.setRedirectUrl(url);

	 		// Navigate to the login page with extras
	 		new LoginUrlResolver().resolve(url).subscribe((loginUrl) => {
	 			this.router.navigate([loginUrl]);
	 		});
	 		return false;
		}
	}

	check(url: string): boolean {
		return this.authService.isLoggedIn();
	}
}