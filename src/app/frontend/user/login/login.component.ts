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
					this.showNotification('server.error');
					return;
				}
				var user = new User(response.user);
				this.handleAuthenticatedUser(user);
			}, (err) => {
				this.userStorage.deleteUser();
				this.showNotification('login.failed');
			});
	}
	handleAuthenticatedUser(user: User){
		this.userStorage.storeUser(user);
		this.showNotification('login.success');	
		this.router.navigate([this.authService.getRedirectUrl()]);
		this.authService.resetRedirectUrl();
	}
	private showNotification(id){
		var notification = this.notifications.filter((notification: NotificationComponent) => notification.id == id)[0];
		this.notificationService.show(notification);
	}
}
