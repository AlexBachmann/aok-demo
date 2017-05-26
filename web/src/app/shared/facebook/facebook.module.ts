import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModule } from '../ui/ui.module';
import { FacebookLoginComponent } from './facebook-login/facebook-login.component';
import { FacebookService } from './facebook.service';

@NgModule({
	imports: [
		CommonModule,
		UiModule
	],
	providers: [ FacebookService ],
	declarations: [ FacebookLoginComponent ],
	exports: [ FacebookLoginComponent ]
})
export class FacebookModule { }
