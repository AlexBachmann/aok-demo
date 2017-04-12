/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormsService } from '../../../shared/forms/forms.service';
import { Form } from '../../../shared/forms/models/form';
import { AuthHttp } from '../../../shared/authentication/http.service';
import { NotificationComponent } from '../../../shared/ui/notification/notification.component';
import { NotificationService } from '../../../shared/ui/notification/notification.service';
import FormData from './form';

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
		private http: AuthHttp,
		private notificationService: NotificationService
	) { }

	ngOnInit() {
		this.form = this.formsService.getFormFromDataObject(FormData);
	}

	onSubmit(value){
		this.loading = true;
		this.http.post('/api/login_check', JSON.stringify(value))
			.subscribe((res) => {
				console.log(res);
			}, (err) => {
				var error = this.notifications.filter((notification: NotificationComponent) => notification.id == 'login.failed')[0];
				this.notificationService.show(error);
			});
	}
}
