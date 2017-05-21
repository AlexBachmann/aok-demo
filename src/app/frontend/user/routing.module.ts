/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterComponent } from './register/register.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { NewPasswordComponent } from './new-password/new-password.component';

const routes: Routes = [
	{ path: 'login', component: LoginComponent }, 
	{ path: 'register', component: RegisterComponent },
	{ path: 'reset-password', component: ResetPasswordComponent },
	{ path: 'confirm/:token', component: ConfirmComponent },
	{ path: 'new-password/:token', component: NewPasswordComponent }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class UserRoutingModule {}