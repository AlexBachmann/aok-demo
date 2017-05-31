/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { ShowcaseComponent } from './showcase.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{ 
		path: '', 
		component: ShowcaseComponent,
		children: [
			{ path: '', component:	HomeComponent }
		]
	}
];

@NgModule({
	imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ShowcaseRoutingModule {}