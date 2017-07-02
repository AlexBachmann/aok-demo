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
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http, Response } from '@angular/http';
import { NotificationService } from '../../../shared/ui/notification/notification.service';
import { NotificationComponent } from '../../../shared/ui/notification/notification.component';
import { UserStorage } from '../../../shared/authentication/user-storage/user-storage.service';
import { AuthenticationService } from '../../../shared/authentication/authentication.service';
import { User } from '../../../shared/authentication/user.entity';

@Component({
	selector: 'tekkl-confirm',
	templateUrl: './confirm.component.html',
	styleUrls: ['./confirm.component.sass']
})
export class ConfirmComponent extends PageComponent implements OnInit {
	public confirmed: boolean | string = false;
	constructor(
		private route: ActivatedRoute, 
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
		this.route.params
			.switchMap((params: Params) => {
				return this.http.post('api/user/confirm', { token: params['token'] });
			})
			.subscribe((res: Response) => {
				var response = res.json();
				this.confirmed = true;

				var user = new User(response.user);
				this.userStorage.storeUser(user);
			}, (err) => {
				this.confirmed = 'error';
				this.userStorage.deleteUser();
			});
	}
}
