/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, OnInit } from '@angular/core';
import { FormsService } from '../../../shared/forms/forms.service';
import { Form } from '../../../shared/forms/models/form';
import { AuthHttp } from '../../../shared/authentication/http.service';
import { NotificationService } from '../../../shared/ui/notification/notification.service';
import FormData from './form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {

  	public form: Form
	public loading: boolean

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
		value.plainPassword = {
			first: value.password,
			second: value.verify_password
		};
		delete(value.password);
		delete(value.verify_password);
		this.http.post('/api/user/register', JSON.stringify(value))
			.subscribe((res) => console.log(res));
	}

}
