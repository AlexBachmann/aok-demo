/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
 
import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';

@Component({
	selector: 'tekkl-notification-container',
	templateUrl: './notification-container.component.html',
	styleUrls: ['./notification-container.component.sass']
})
export class NotificationContainerComponent implements OnInit {
	constructor(private notificationService: NotificationService) { 
		
	}

	ngOnInit() {
	}
}
