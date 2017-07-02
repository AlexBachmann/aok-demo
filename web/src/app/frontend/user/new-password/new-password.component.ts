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
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Validators } from '../../../shared/forms/validators/general';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationComponent } from '../../../shared/ui/notification/notification.component';
import { NotificationService } from '../../../shared/ui/notification/notification.service';

@Component({
	selector: 'tekkl-new-password',
	templateUrl: './new-password.component.html',
	styleUrls: ['./new-password.component.sass']
})
export class NewPasswordComponent extends PageComponent implements OnInit {
	public form: FormGroup
	public success: boolean = false;
	public error: string = '';

	constructor(
		private fb: FormBuilder,
		private http: Http,
		private router: Router,
		private route: ActivatedRoute,
		title: Title,
		notificationService: NotificationService,
	) { 
		super(title, notificationService);
	}

	ngOnInit() {
		this.setPageTitle();
		this.form = this.createForm();
		this.route.params.subscribe((params) => {
			this.form.get('confirmation_token').setValue(params['token']);
		});
	}
	onSubmit(value){
		console.log(value);
		this.http.post('/api/user/password/new', JSON.stringify(value))
			.subscribe((res: Response) => {
				var response = res.json();
				this.success = true;
			}, (err: Response) => {
				this.success = false;
				var error = err.json();
				this.error = error.message;
			});
	}
	createForm(): FormGroup {
		return this.fb.group({
			reset_form: this.fb.group({
				plainPassword: this.fb.group({
					first: ['', [Validators.required, Validators.minLength(8)]],
					second: ['', [Validators.required, Validators.minLength(8)]]
				}, {validator: Validators.matching(['first', 'second'])})
			}),
			confirmation_token: ['']
		});
	}
}
