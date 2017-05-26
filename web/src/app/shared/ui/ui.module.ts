import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalSlideComponent } from './vertical-slide/vertical-slide.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationContainerComponent } from './notification/notification-container.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [ VerticalSlideComponent, NotificationComponent, NotificationContainerComponent],
	exports: [ VerticalSlideComponent, NotificationComponent, NotificationContainerComponent ]
})
export class UiModule { }
