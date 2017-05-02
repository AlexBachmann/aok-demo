/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { NgModule, InjectionToken } from '@angular/core';
import { Http } from '@angular/http';
import { TekklHttpService } from './http/http.service';
import { CommonModule } from '@angular/common';
import { Config } from '../../configuration.service';
import { AuthGuard } from './guards/auth-guard.service';
import { AdminAuthGuard } from './guards/admin-auth-guard.service';
import { AuthenticationService } from './authentication.service';
import { UserStorage } from './user-storage/user-storage.service';
import { LocalStorageJwtStorage } from './jwt-storage/local-storage.service';
import { JwtStorage } from './jwt-storage/jwt-storage.service';
import { LocalStorageUserStorage } from './user-storage/local-storage.service';
import { RefreshTokenStorage } from './refresh-token-storage/refresh-token-storage.service';
import { LocalStorageRefreshTokenStorage } from './refresh-token-storage/local-storage.service';


@NgModule({
	imports: [
		CommonModule
	],
	declarations: [

	],
	providers: [
		{ provide: UserStorage, useClass: LocalStorageUserStorage },
		{ provide: JwtStorage, useClass: LocalStorageJwtStorage },
		{ provide: RefreshTokenStorage, useClass: LocalStorageRefreshTokenStorage },
		{ provide: Http, useClass: TekklHttpService},
		AuthenticationService,
		AuthGuard,
		AdminAuthGuard,
	]
})
export class AuthenticationModule { }
