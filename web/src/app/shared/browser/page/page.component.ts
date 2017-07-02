/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
**/
import { ViewChild, ViewChildren, QueryList, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NotificationComponent } from '../../ui/notification/notification.component';
import { NotificationService } from '../../ui/notification/notification.service';
import { PageTitleComponent } from '../../ui/page-title/page-title.component';

export abstract class PageComponent implements OnInit {
	@ViewChildren(NotificationComponent) notifications: QueryList<NotificationComponent>;
	@ViewChild(PageTitleComponent) pageTitle: PageTitleComponent

	constructor(
		protected title: Title, 
		protected notificationService: NotificationService
	){}
	ngOnInit() {
		this.setPageTitle();
	}
	protected setPageTitle(){
		if(this.pageTitle){
			this.title.setTitle(this.pageTitle.getTitle());
		}
	}
	protected showNotification(id){
		var notification = this.notifications.filter((notification: NotificationComponent) => notification.id == id)[0];
		if(notification){
			this.notificationService.show(notification);
		}else{
			throw new Error('There is no Notification defined with the id ' + id );
		}
	}
}