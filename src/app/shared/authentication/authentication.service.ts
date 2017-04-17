/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Injectable } from '@angular/core';
import { User } from './user.entity';
import { UserStorage } from './user-storage/user-storage.service';

@Injectable()
export class AuthenticationService {
	private user: User = null
	private redirectUrl: string = '/';
	constructor(private storage: UserStorage){}
	getUser(): User{
		return this.storage.getUser();
	}
	isLoggedIn():boolean{
		var user = this.getUser();
		return (user && user.id) ? true : false;
	}
	setRedirectUrl(url:string){
		this.redirectUrl = url;
	}
	getRedirectUrl():string{
		return this.redirectUrl;
	}
	resetRedirectUrl(){
		this.redirectUrl = '/';
	}
}