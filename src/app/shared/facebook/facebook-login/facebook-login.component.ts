/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, OnInit, QueryList, ViewChildren, EventEmitter, Output } from '@angular/core';
import { Http } from '@angular/http';
import { FacebookService } from '../facebook.service';
import { NotificationComponent } from '../../ui/notification/notification.component';
import { NotificationService } from '../../ui/notification/notification.service';
import { User } from '../../authentication/user.entity';

@Component({
	selector: 'tekkl-facebook-login',
	templateUrl: './facebook-login.component.html',
	styleUrls: ['./facebook-login.component.sass']
})
export class FacebookLoginComponent implements OnInit {
	@ViewChildren(NotificationComponent) notifications: QueryList<NotificationComponent>;
	@Output('afterLogin') loginEventEmitter: EventEmitter<User> = new EventEmitter()
	constructor(
		private facebookService: FacebookService, 
		private notificationService: NotificationService,
		private http: Http
	) {}

	ngOnInit(){}
	async login(){
		if(!await this.createFacebookConnection()){
			this.showError('login-failure');
		}
		var facebookUserData = await this.facebookService.api('/me?fields=email,name,id').toPromise();
		try {
			var response = await this.http.post('/api/facebook/login', JSON.stringify(facebookUserData)).toPromise();
			var data = response.json();
			if(!data.user){
				throw new Error('No user data received from server');
			}
			var user = new User(data.user);
			this.loginEventEmitter.emit(user);
		}catch(error){
			console.log(error);
			this.showError('login-failure');
		}
	}

	private async createFacebookConnection():Promise<boolean>{
		var loginStatus = await this.facebookService.getLoginStatus().toPromise();
		if(!loginStatus.authResponse){
			loginStatus = await this.facebookService.login({scope: 'email'}).toPromise();
			if(!loginStatus.authResponse){
				return false;
			}
		}
		return true;
	}
	private showError(id:string){
		var notification = this.notifications.filter((notification: NotificationComponent) => notification.id == id)[0];
		this.notificationService.show(notification);
	}
}
