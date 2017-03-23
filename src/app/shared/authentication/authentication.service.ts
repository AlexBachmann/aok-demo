/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Injectable } from '@angular/core';
import { JwtHelper } from './jwt.helper';
import { Config } from '../../configuration.service';
import { User } from './user.entity';

@Injectable()
export class AuthenticationService {
	private setJWTToken:(token:string) => void
	private getJWTToken:() => string
	private user: User = null
	constructor(private config: Config){
		this.setJWTToken = config.get('jwt').tokenSetter;
		this.getJWTToken = config.get('jwt').tokenGetter;
	}
	getUser(): User{
		if(!this.user){
			var token = this.getJWTToken();
			if(token){
				var helper = new JwtHelper();
				var claims = helper.decodeToken(token);
				var user = {
					id: claims.uid,
					firstname: claims.ufn,
					lastname: claims.uln
				};
				this.user = new User(user);
			}else{
				return new User({ id: 0 });
			}
		}
		return this.user;
	}
	loggedIn():boolean{
		var user = this.getUser();
		return (user && user.id) ? true : false;
	}
}