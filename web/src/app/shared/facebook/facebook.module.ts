import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { FacebookService } from './facebook.service';
import { NotificationModule } from '../ui/notification/notification.module';

@NgModule({
	imports: [
		CommonModule,
		NotificationModule
	],
	providers: [ FacebookService ],
	declarations: [ FacebookLoginComponent ],
	exports: [ FacebookLoginComponent ]
})
export class FacebookModule { }
