/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Injectable } from '@angular/core';
import { NotificationComponent } from './notification.component';

@Injectable()
export class NotificationService {
	protected stack: NotificationComponent[] = []
	protected random: number

	constructor(){}

	show(notification: NotificationComponent){
		if(this.stack.indexOf(notification) < 0){
			this.stack.push(notification);
		}
		notification.activate();
	}

	remove(notification: NotificationComponent){
		var index = this.stack.indexOf(notification);
		if(index >= 0){
			this.stack.splice(index, 1);
		}
	}

	getNotifications(){
		return this.stack;
	}

	getActiveNotifications(){
		var active = [];
		for(var notification of this.stack){
			if (notification.isActive()) active.push(notification);
		}
		return active;
	}
	hasActiveNotifications(){
		return (this.getActiveNotifications().length) ? true : false;
	}
}