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
import { FrontendComponent } from './frontend.component';

const routes: Routes = [
	{ 
		path: '', 
		component: FrontendComponent,
		children: [
			{ path: 'user', loadChildren:	'app/frontend/user/user.module#UserModule' },
			{ path: '', loadChildren:	'app/frontend/home/home.module#HomeModule' }
		]
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
export class FrontendRoutingModule {}