/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { TekklHttpServiceFactory } from './shared/http/http.service';
import { Config } from './configuration.service';
import { AppRoutingModule } from './routing.module';
import { AuthenticationModule } from './shared/authentication/authentication.module';
import { NotificationService } from './shared/ui/notification/notification.service';
import { EventsModule } from './shared/events/events.module';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpModule,
		AuthenticationModule,
		AppRoutingModule,
		EventsModule,
	],
	providers: [
		Config,
		{ provide: Http, useFactory: TekklHttpServiceFactory, deps: [Config, XHRBackend, RequestOptions] },
		NotificationService,
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
	