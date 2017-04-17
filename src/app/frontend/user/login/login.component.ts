/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { FormsService } from '../../../shared/forms/forms.service';
import { Form } from '../../../shared/forms/models/form';
import { NotificationComponent } from '../../../shared/ui/notification/notification.component';
import { NotificationService } from '../../../shared/ui/notification/notification.service';
import FormData from './form';
import { UserStorage } from '../../../shared/authentication/user-storage/user-storage.service';
import { AuthenticationService } from '../../../shared/authentication/authentication.service';
import { User } from '../../../shared/authentication/user.entity';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
	public form: Form
	public loading: boolean
	@ViewChildren(NotificationComponent) notifications: QueryList<NotificationComponent>;

	constructor(
		private formsService: FormsService,
		private http: Http,
		private notificationService: NotificationService,
		private router: Router,
		private userStorage: UserStorage,
		private authService: AuthenticationService
	) { }

	ngOnInit() {
		this.form = this.formsService.getFormFromDataObject(FormData);
	}

	onSubmit(value){
		this.loading = true;
		this.http.post('/api/login_check', JSON.stringify(value))
			.subscribe((res) => {
				var response = res.json();
				if(!response.user){
					var notification = this.notifications.filter((notification: NotificationComponent) => notification.id == 'server.error')[0];
					this.notificationService.show(notification);
					return;
				}
				var user = new User(response.user);
				this.userStorage.storeUser(user);
				
				var notification = this.notifications.filter((notification: NotificationComponent) => notification.id == 'login.success')[0];
				this.notificationService.show(notification);
				this.router.navigate([this.authService.getRedirectUrl()]);
				this.authService.resetRedirectUrl();
			}, (err) => {
				this.userStorage.deleteUser();
				var error = this.notifications.filter((notification: NotificationComponent) => notification.id == 'login.failed')[0];
				this.notificationService.show(error);
			});
	}
}
