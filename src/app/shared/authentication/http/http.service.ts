/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Config } from '../../../configuration.service';
import HttpConfig from './config';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { LoginUrlResolver } from '../../url-resolver/login-url-resolver';
import { AuthenticationService } from '../authentication.service';
import { JwtStorage } from '../jwt-storage/jwt-storage.service';
import { RefreshTokenStorage } from '../refresh-token-storage/refresh-token-storage.service';

@Injectable()
export class TekklHttpService extends Http {
	constructor(
		xhrBackend: XHRBackend, 
		requestOptions: RequestOptions, 
		private config: Config,
		protected authService: AuthenticationService,
		protected router: Router,
		protected jwtStorage: JwtStorage,
		protected refreshTokenStorage: RefreshTokenStorage
	){
		super(xhrBackend, requestOptions);
		this.config.load('http', HttpConfig, false);
	}
	request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
		if(typeof url === 'string'){
			url = this._transformUrl(url);
			var options = options || {},
				headers = options.headers || new Headers();
			options.headers = this._appendAuthHeaders(headers);
		}else if(url instanceof Request){
			url.url = this._transformUrl(url.url);
			var headers = url.headers || new Headers();
			url.headers = this._appendAuthHeaders(headers);
		}
		return super.request(url, options)
			.map((res: Response): Response => {
				this._retrieveAuthHeaders(res.headers);
				return res;
			})
	 		.catch((error: Response) => {
	 			if(error.status == 401){
	 				new LoginUrlResolver().resolve(this.router.url).subscribe((loginUrl) => {
			 			this.router.navigate([loginUrl]);
			 		});
	 			}	
	 			return Observable.throw(error);
	 		});
	}
	_transformUrl(url: string){
		if(url.substr(0, 4) !== 'http'){
			var endpoint = '';
			if(isDevMode()){
				endpoint += this.config.get('http.endpoint.dev', '');
			}else{
				endpoint += this.config.get('http.endpoint.prod', '');
			}
			if(url.substr(0, 1) !== '/') url = '/' + url;
			if(endpoint){
				url = endpoint + url;
			}
		}
		return url;
	}
	_appendAuthHeaders(headers: Headers): Headers{
		var jwt = this.jwtStorage.getJwtToken();
		var refreshToken = this.refreshTokenStorage.getRefreshToken();
		if(jwt){
			headers.set('Authorization', jwt);
		}
		if(refreshToken){
			headers.set('Refresh-Token', refreshToken);
		}
		return headers;
	}
	_retrieveAuthHeaders(headers: Headers) {
		var jwt = headers.get('Authorization'),
			refreshToken = headers.get('Refresh-Token');

		if(jwt){
			this.jwtStorage.storeJwtToken(jwt);
		}
		if(refreshToken){
			this.refreshTokenStorage.storeRefreshToken(refreshToken);
		}
	}
}