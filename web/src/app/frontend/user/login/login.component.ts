/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PageComponent } from '../../../shared/browser/page/page.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '../../../shared/forms/validators/general';
import { Http } from '@angular/http';
import { NotificationComponent } from '../../../shared/ui/notification/notification.component';
import { NotificationService } from '../../../shared/ui/notification/notification.service';
import { UserStorage } from '../../../shared/authentication/user-storage/user-storage.service';
import { AuthenticationService } from '../../../shared/authentication/authentication.service';
import { User } from '../../../shared/authentication/user.entity';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass']
})
export class LoginComponent extends PageComponent implements OnInit {
	public form: FormGroup
	public loading: boolean

	constructor(
		private fb: FormBuilder,
		private http: Http,
		private router: Router,
		private userStorage: UserStorage,
		private authService: AuthenticationService,
		title: Title,
		notificationService: NotificationService
	) { 
		super(title, notificationService);
	}

	ngOnInit() {
		this.setPageTitle();
		this.form = this.createForm();
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
	createForm(): FormGroup {
		return this.fb.group({
			_username: ['', [Validators.required, Validators.minLength(2)]],
			_password: ['', [Validators.required, Validators.minLength(8)]]
		});
	}
}
