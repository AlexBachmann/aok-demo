/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Http } from '@angular/http';
import { FacebookService } from '../facebook.service';
import { NotificationComponent } from '../../../shared/ui/notification/notification.component';
import { NotificationService } from '../../../shared/ui/notification/notification.service';

@Component({
	selector: 'tekkl-facebook-login',
	templateUrl: './facebook-login.component.html',
	styleUrls: ['./facebook-login.component.sass']
})
export class FacebookLoginComponent implements OnInit {
	@ViewChildren(NotificationComponent) notifications: QueryList<NotificationComponent>;
	constructor(
		private facebookService: FacebookService, 
		private notificationService: NotificationService,
		private http: Http
	) {}

	ngOnInit(){}
	async login(){
		var response = await this.facebookService.getLoginStatus().toPromise();
		if(!response.authResponse){
			response = await this.facebookService.login({scope: 'email'}).toPromise();
			if(!response.authResponse){
				var notification = this.notifications.filter((notification: NotificationComponent) => notification.id == 'login-failure')[0];
				this.notificationService.show(notification);
				return;
			}
		}
		var userData = await this.facebookService.api('/me?fields=email,name,id').toPromise();
		console.log(userData);
		var response2 = await this.http.post('/api/facebook/login', JSON.stringify(userData)).toPromise();
		console.log(response2);
	}

}
