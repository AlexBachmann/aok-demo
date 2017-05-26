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
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '../../../shared/forms/validators/general';
import { Http } from '@angular/http';
import { NotificationService } from '../../../shared/ui/notification/notification.service';
import { NotificationComponent } from '../../../shared/ui/notification/notification.component';
import { UserStorage } from '../../../shared/authentication/user-storage/user-storage.service';
import { AuthenticationService } from '../../../shared/authentication/authentication.service';
import { User } from '../../../shared/authentication/user.entity';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  	public form: FormGroup
	public loading: boolean
	@ViewChildren(NotificationComponent) notifications: QueryList<NotificationComponent>;

	constructor(
		private fb: FormBuilder,
		private http: Http,
		private notificationService: NotificationService,
		private router: Router,
		private userStorage: UserStorage,
		private authService: AuthenticationService
	) { }

	ngOnInit() {
		this.form = this.createForm();
	}

	onSubmit(value){
		this.loading = true;
		this.http.post('/api/user/register', JSON.stringify(value))
			.subscribe((res) => {
				var response = res.json();
				if(response.confirmation_required){
					this.handleRequiredConfirmation();
					return;
				}
				if(!response.user){
					this.showNotification('server.error');
					return;
				}
				var user = new User(response.user);
				this.handleAuthenticatedUser(user);
			}, (err) => {
				this.userStorage.deleteUser();
				this.clearFormPassword(value);
				var response = err.json();
				if(response.message){
					var errors = response.message.split('|');
					errors.forEach((error) => {
						var notifications = this.notifications.filter((notification: NotificationComponent) => notification.id == error);
						if(notifications.length){
							this.notificationService.show(notifications[0]);
						}
					});
				}
			});
	}
	handleAuthenticatedUser(user: User){
		this.userStorage.storeUser(user);
		this.showNotification('registration.success');

		this.router.navigate([this.authService.getRedirectUrl()]);
		this.authService.resetRedirectUrl();
	}
	handleRequiredConfirmation(){
		this.showNotification('confirmation.required');
		this.authService.resetRedirectUrl();
		this.router.navigate([this.authService.getRedirectUrl()]);
	}
	showNotification(id:string){
		var notification = this.notifications.filter((notification: NotificationComponent) => notification.id == id)[0];
		this.notificationService.show(notification);
	}
	clearFormPassword(value){
		this.form.get('plainPassword').get('first').setValue('');
		this.form.get('plainPassword').get('second').setValue('');
	}
	createForm(): FormGroup {
		return this.fb.group({
			username: ['', [Validators.required, Validators.minLength(2)]],
			email: ['', [Validators.required, Validators.email]],
			plainPassword: this.fb.group({
				first: ['', [Validators.required, Validators.minLength(8)]],
				second: ['', [Validators.required, Validators.minLength(8)]]
			}, {validator: Validators.matching(['first', 'second'])})
		});
	}
}
