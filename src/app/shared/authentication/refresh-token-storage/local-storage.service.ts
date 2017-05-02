/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Injectable } from '@angular/core';
import { RefreshTokenStorage } from './refresh-token-storage.service';
import { Config } from '../../../configuration.service';
import AuthConfig  from '../config';

@Injectable()
export class LocalStorageRefreshTokenStorage extends RefreshTokenStorage {
	constructor(private config: Config){
		super();
		this.config.load('authentication', AuthConfig, false);
	}
	storeRefreshToken(token: string){
		var key = this.getKey();
		localStorage.getItem(key);
		localStorage.setItem(key, token);
	}
	getRefreshToken(): string {
		var key = this.getKey();
		var token = localStorage.getItem(key);
		
		return (token) ? token : null;
	}
	deleteRefreshToken(){
		var key = this.getKey();
		localStorage.removeItem(key);
	}
	private getKey(){
		return this.config.get('authentication.refreshTokenStorage.localStorage.key', 'tekkl-refresh-token');
	}
}