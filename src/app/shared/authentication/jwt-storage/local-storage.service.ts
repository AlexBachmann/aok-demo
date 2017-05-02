/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Injectable } from '@angular/core';
import { JwtStorage } from './jwt-storage.service';
import { Config } from '../../../configuration.service';
import AuthConfig  from '../config';

@Injectable()
export class LocalStorageJwtStorage extends JwtStorage {
	constructor(private config: Config){
		super();
		this.config.load('authentication', AuthConfig, false);
	}
	storeJwtToken(jwt: string){
		var key = this.getKey();
		localStorage.getItem(key);
		localStorage.setItem(key, jwt);
	}
	getJwtToken(): string {
		var key = this.getKey();
		var jwt = localStorage.getItem(key);
		
		return (jwt) ? jwt : null;
	}
	deleteJwtToken(){
		var key = this.getKey();
		localStorage.removeItem(key);
	}
	private getKey(){
		return this.config.get('authentication.jwtStorage.localStorage.key', 'tekkl-jwt-token');
	}
}