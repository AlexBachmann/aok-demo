/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../configuration.service';
import { JwtHelper } from './jwt.helper';
import 'rxjs/add/operator/map'
import { Http, Headers, Request, RequestOptions, RequestOptionsArgs, RequestMethod, Response } from '@angular/http';

export interface IAuthConfig {
	headerName: string;
	headerPrefix: string;
	tokenName: string;
	tokenGetter: any;
	tokenSetter: any;
	noJwtError: boolean;
	endpoint: string;
}

/**
 * Sets up the authentication configuration.
 */

export class AuthConfig {
	
	config: any;
	headerName: string;
	headerPrefix: string;
	tokenName: string;
	tokenGetter: any;
	tokenSetter: any;
	noJwtError: boolean;
	endpoint: string;

	constructor(config?: any) {
		this.config = config || {};
		this.headerName = this.config.headerName || 'Authorization';
		if(this.config.headerPrefix) {
			this.headerPrefix = this.config.headerPrefix + ' ';
		} else {
			this.headerPrefix = 'Bearer ';
		}
		this.tokenName = this.config.tokenName || 'id_token';
		this.noJwtError = this.config.noJwtError || false;
		this.tokenGetter = this.config.tokenGetter || (() => localStorage.getItem(this.tokenName));
		this.tokenSetter = this.config.tokenSetter || ((token) => localStorage.setItem(this.tokenName, token));
		this.endpoint = '';
		if(isDevMode()){
			if(this.config.devEndpoint){
				this.endpoint = this.config.devEndpoint;
			}else if(this.config.prodEndpoint){
				this.endpoint = this.config.prodEndpoint;
			}
		}
	}
	getConfig() {
		return {
			headerName: this.headerName,
			headerPrefix: this.headerPrefix,
			tokenName: this.tokenName,
			tokenGetter: this.tokenGetter,
			tokenSetter: this.tokenSetter,
			noJwtError: this.noJwtError,
			endpoint: this.endpoint
		}
	}
}

/**
 * Allows for explicit authenticated HTTP requests.
 */

@Injectable()
export class AuthHttp {

	private _config: IAuthConfig;
	public tokenStream: Observable<string>;

	constructor(
		private options: AuthConfig, 
		private http: Http
	) {
		this._config = options.getConfig();

		this.tokenStream = new Observable((obs: any) => {
			obs.next(this._config.tokenGetter())
		});
	}
	_transformUrl(url: string){
		if(url.substr(0, 4) !== 'http'){
			if(url.substr(0, 1) !== '/') url = '/' + url;
			if(this._config.endpoint){
				url = this._config.endpoint + url;
			}
		}
		return url;
	}
	_request(url: string | Request, options?: RequestOptionsArgs) : Observable<Response> {

		let request:any;

		if(typeof url === 'string'){
			url = this._transformUrl(url);
		}
		
		if (!this._config.tokenGetter() || !tokenNotExpired(null, this._config.tokenGetter())) {
			if(!this._config.noJwtError) {
				throw 'Invalid JWT';
			} else {
				request = this.http.request(url, options);
			}
		} else if(typeof url === 'string') {
			let reqOpts = options || {};
			
			if(!reqOpts.headers) {
				reqOpts.headers = new Headers();
			}
			reqOpts.headers.set(this._config.headerName, this._config.headerPrefix + this._config.tokenGetter());
			request = this.http.request(url, reqOpts);
		} else {
			let req:Request = <Request>url;
			if(!req.headers) {
				req.headers = new Headers();
			}
			req.headers.set(this._config.headerName, this._config.headerPrefix + this._config.tokenGetter());
			request = this.http.request(req);
		}
		return request.map((res) => {
			return this.saveTokenFromResponse(res);
		});
	}

	private requestHelper(requestArgs: RequestOptionsArgs, additionalOptions: RequestOptionsArgs) : Observable<Response> {
		if(typeof requestArgs.url === 'string'){
			requestArgs.url = this._transformUrl(requestArgs.url);
		}
		let options = new RequestOptions(requestArgs);
		if(additionalOptions) {
			options = options.merge(additionalOptions)
		}
		return this._request(new Request(options))
	}
	get(url: string, options?: RequestOptionsArgs) : Observable<any> {
		return this.requestHelper({ url: url, method: RequestMethod.Get }, options);
	}

	post(url: string, body: string, options?: RequestOptionsArgs) : Observable<Response> {
		var headers = new Headers();
		headers.set('content-type', 'application/json');
		return this.requestHelper({ url: url, body: body, method: RequestMethod.Post, headers: headers }, options);
	}

	put(url: string, body: string, options ?: RequestOptionsArgs) : Observable<Response> {
		var headers = new Headers();
		headers.set('content-type', 'application/json');
		return this.requestHelper({ url: url, body: body, method: RequestMethod.Put, headers: headers }, options);
	}

	delete(url: string, options ?: RequestOptionsArgs) : Observable<Response> {
		return this.requestHelper({ url: url, method: RequestMethod.Delete }, options);
	}

	patch(url: string, body:string, options?: RequestOptionsArgs) : Observable<Response> {
		var headers = new Headers();
		headers.set('content-type', 'application/json');
		return this.requestHelper({ url: url, body: body, method: RequestMethod.Patch, headers: headers }, options);
	}

	head(url: string, options?: RequestOptionsArgs) : Observable<Response> {
		return this.requestHelper({ url: url, method: RequestMethod.Head }, options);
	}

	private saveTokenFromResponse(res){
		var response = res.json();
		if(response.code == 401){
			this.destroyToken();
		}else if (response.jwt) {
			this._config.tokenSetter(response.jwt);
		}
		if (response.destroy_jwt) {
			this.destroyToken();
		}
		return res;
	}
	destroyToken(){
		this._config.tokenSetter('');
	}
}

/**
 * Checks for presence of token and that token hasn't expired.
 * For use with the @CanActivate router decorator and NgIf
 */

export function tokenNotExpired(tokenName?:string, jwt?:string) {

	var authToken:string = tokenName || 'id_token';
	var token:string;

	if(jwt) {
		token = jwt;
	}
	else {
		token = localStorage.getItem(authToken);
	}

	var jwtHelper = new JwtHelper();
	
	if(!token || jwtHelper.isTokenExpired(token, null)) {
		return false;
	}

	else {
		return true;
	}
}

//@Injectable()
export function AuthHttpFactory(http: Http, config: Config){
	return new AuthHttp(new AuthConfig(config.get('http')), http);
}