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
import { BackendComponent } from './backend.component';
import { LoginComponent } from './login/login.component';
import { AdminAuthGuard } from '../shared/authentication/guards/admin-auth-guard.service';

const routes: Routes = [
	{ 
		path: '', 
		component: BackendComponent,
		canActivate: [AdminAuthGuard],
		children: [
			{ path: '', loadChildren:	'app/backend/dashboard/dashboard.module#DashboardModule' }
		]
	},
	{ 
		path: 'login', 
		component: LoginComponent
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class BackendRoutingModule {}