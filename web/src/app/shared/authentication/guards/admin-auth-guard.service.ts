/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { AuthGuard } from './auth-guard.service';

export class AdminAuthGuard extends AuthGuard {
	check(url: string): boolean {
		var user = this.authService.getUser();
		var roles = user.getRoles();
		if(user.id && roles.indexOf('ROLE_ADMIN') >= 0){
			return true;
		}
		return false;
	}
}