/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PageComponent } from '../../shared/browser/page/page.component';
import { NotificationService } from '../../shared/ui/notification/notification.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass']
})
export class HomeComponent extends PageComponent implements OnInit {
	constructor(
		title: Title,
		notificationService: NotificationService
	){
		super(title, notificationService);
	}

	ngOnInit() {
		this.setPageTitle();
	}

}
