/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './routing.module';
import { FormsModule } from '../../shared/forms/forms.module';
import { FacebookModule } from '../../shared/facebook/facebook.module';
import { ConfirmComponent } from './confirm/confirm.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { BrowserModule } from '../../shared/browser/browser.module';
import { NotificationModule } from '../../shared/ui/notification/notification.module';
import { FormViewComponent } from '../shared/ui/form-view/form-view.component';

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		NotificationModule,
		UserRoutingModule,
		FormsModule,
		FacebookModule,
	],
	declarations: [
		LoginComponent, 
		RegisterComponent, 
		ConfirmComponent, 
		ResetPasswordComponent, 
		NewPasswordComponent,
		FormViewComponent
	]
})
export class UserModule { }
