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
import { Http, Response } from '@angular/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationComponent } from '../../../shared/ui/notification/notification.component';
import { NotificationService } from '../../../shared/ui/notification/notification.service';
import { Validators } from '../../../shared/forms/validators/general';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent extends PageComponent implements OnInit {
	public form: FormGroup
	public loading: boolean
	public success: boolean = false;

	constructor(
		private fb: FormBuilder,
		private http: Http,
		private router: Router,
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
		this.http.post('/api/user/passwort/reset', JSON.stringify(value))
			.subscribe((res: Response) => {
				var response = res.json();
				this.success = true;
			}, (err: Response) => {
				this.success = false;
				switch(err.status){
					case 400:
						this.showNotification('email.does.not.exist');
						break;
					case 423:
						this.showNotification('reset.email.already.sent');
						break;
					default:
						this.showNotification('server.error');
						break;
				}
			});
	}
	createForm(): FormGroup {
		return this.fb.group({
			email: ['', [Validators.required, Validators.email]]
		});
	}
}
