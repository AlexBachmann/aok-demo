/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './guards/auth-guard.service';
import { AdminAuthGuard } from './guards/admin-auth-guard.service';
import { AuthenticationService } from './authentication.service';
import { UserStorage } from './user-storage/user-storage.service';
import { LocalStorageUserStorage } from './user-storage/local-storage.service'; 

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [

	],
	providers: [
		{ provide: UserStorage, useClass: LocalStorageUserStorage },
		AuthenticationService,
		AuthGuard,
		AdminAuthGuard,
	]
})
export class AuthenticationModule { }
