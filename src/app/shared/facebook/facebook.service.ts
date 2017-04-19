import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Config } from '../../configuration.service';
import FacebookConfig from './config';
import { WindowRef } from '../browser/window-ref.service';
import { DocumentRef } from '../browser/document-ref.service';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/toPromise';
import { LoginStatusResponse, ApiResponse, LoginOptions } from './interfaces';

@Injectable()
export class FacebookService {
	private sdk$:Observable<boolean>;

	constructor(private config: Config, private windowRef: WindowRef, private documentRef: DocumentRef) {
		this.config.load('facebook', FacebookConfig, false);
		if(!this.config.get('facebook.appId')){
			console.warn('You need to provide your Facebook appId in your application configuration');
			return;
		}
		this.initializeFacebook();
	}
	getLoginStatus(): Observable<LoginStatusResponse> {
		let window = this.windowRef.nativeWindow;
		var observable = new Observable<LoginStatusResponse>((responseObserver: Observer<LoginStatusResponse>) => {
			window.FB.getLoginStatus(response => {
				responseObserver.next(response);
				responseObserver.complete();
	        });
		});
        return observable;
	}
	login(options?: LoginOptions):Observable<LoginStatusResponse>{
		let window = this.windowRef.nativeWindow;
		var observable = new Observable<LoginStatusResponse>((responseObserver: Observer<LoginStatusResponse>) => {
			window.FB.login(response => {
				responseObserver.next(response);
				responseObserver.complete();
	        }, options);
		});

        return observable;
	}
	api(path: string):Observable<ApiResponse>{
		let window = this.windowRef.nativeWindow;
		var observable = new Observable<ApiResponse>((responseObserver: Observer<ApiResponse>) => {
			window.FB.api(path, (response) => {
				responseObserver.next(response);
				responseObserver.complete();
	        });
		});
		return observable;
	}
	private initializeFacebook(){
		this.addSdkToDom();
		this.registerInitializer();
	}
	private registerInitializer(){
		let window = this.windowRef.nativeWindow;
		if (!window.fbAsyncInit) {
			window.fbAsyncInit = () => {
				window.FB.init({
					appId: this.config.get('facebook.appId', null),
					xfbml: this.config.get('facebook.xfbml', true),
					version: this.config.get('facebook.version', 'v2.9')
				});
			};
		}
	}
	private addSdkToDom(){
		let document = this.documentRef.nativeDocument;
		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	}
}
