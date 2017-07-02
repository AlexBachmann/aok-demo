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
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './routing.module';
import { BrowserModule } from '../../shared/browser/browser.module';
import { NotificationModule } from '../../shared/ui/notification/notification.module';

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		DashboardRoutingModule,
		NotificationModule
	],
	declarations: [DashboardComponent]
})
export class DashboardModule { }
