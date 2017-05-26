/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Injectable } from '@angular/core';
import { UserStorage } from './user-storage.service';
import { User } from '../user.entity';
import { Config } from '../../../configuration.service';
import AuthConfig  from '../config';

@Injectable()
export class LocalStorageUserStorage extends UserStorage {
	constructor(private config: Config){
		super();
		this.config.load('authentication', AuthConfig, false);
	}
	storeUser(user: User){
		var key = this.getKey();
		localStorage.getItem(key);
		localStorage.setItem(key, user.toJson());
	}
	getUser(): User {
		var key = this.getKey();
		var data = localStorage.getItem(key);
		if(data){
			data = JSON.parse(data);
			var user = new User(data);
		}else{
			var user = new User ({id: 0});
		}
		return user;
	}
	deleteUser(){
		var key = this.getKey();
		localStorage.removeItem(key);
	}
	private getKey(){
		return this.config.get('authentication.userStorage.localStorage.key', 'tekkl-user');
	}
}