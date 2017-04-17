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

export class TekklHttpService extends Http {
	constructor(private config, xhrBackend: XHRBackend, requestOptions: RequestOptions){
		super(xhrBackend, requestOptions);
		this.config.load('http', HttpConfig, false);
	}
	request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
		if(typeof url === 'string'){
			url = this._transformUrl(url);
		}else if(url instanceof Request){
			url.url = this._transformUrl(url.url);
		}
		return super.request(url, options);
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

export function TekklHttpServiceFactory (config: Config, xhrBackend: XHRBackend, requestOptions: RequestOptions){
	return new TekklHttpService(config, xhrBackend, requestOptions);
}