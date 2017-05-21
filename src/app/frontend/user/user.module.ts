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
import { UiModule } from '../../shared/ui/ui.module';
import { FacebookModule } from '../../shared/facebook/facebook.module';
import { ConfirmComponent } from './confirm/confirm.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewPasswordComponent } from './new-password/new-password.component';

@NgModule({
	imports: [
		CommonModule,
		UserRoutingModule,
		FormsModule,
		UiModule,
		FacebookModule,
	],
	declarations: [LoginComponent, RegisterComponent, ConfirmComponent, ResetPasswordComponent, NewPasswordComponent]
})
export class UserModule { }
