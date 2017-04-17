/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

 import { Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response } from '@angular/http';
 import { Config } from '../../configuration.service';
 import HttpConfig from './config';
 import { Injectable, isDevMode } from '@angular/core';
 import { Observable } from 'rxjs/Observable';
 import { Router } from '@angular/router';
 import { LoginUrlResolver } from '../url-resolver/login-url-resolver';
 import { AuthenticationService } from '../authentication/authentication.service';

 export class TekklHttpService extends Http {
 	constructor(
 		xhrBackend: XHRBackend, 
 		requestOptions: RequestOptions, 
 		private config: Config,
 		protected authService: AuthenticationService,
 		protected router: Router
 	){
 		super(xhrBackend, requestOptions);
 		this.config.load('http', HttpConfig, false);
 	}
 	request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
 		if(typeof url === 'string'){
 			url = this._transformUrl(url);
 		}else if(url instanceof Request){
 			url.url = this._transformUrl(url.url);
 		}
 		return super.request(url, options)
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
 }

 export function TekklHttpServiceFactory (
 	xhrBackend: XHRBackend, 
 	requestOptions: RequestOptions, 
 	config: Config,
 	authService: AuthenticationService,
 	router: Router
 ){
 	return new TekklHttpService(xhrBackend, requestOptions, config, authService, router);
 }