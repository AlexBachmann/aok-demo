/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { BrowserModule, EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { BrowserModule as TekklBrowserModule } from './shared/browser/browser.module';
import { Config } from './configuration.service';
import { AppRoutingModule } from './routing.module';
import { AuthenticationModule } from './shared/authentication/authentication.module';
import { AuthenticationService } from './shared/authentication/authentication.service';
import { NotificationService } from './shared/ui/notification/notification.service';
import { EventsModule } from './shared/events/events.module';
import { FacebookModule } from './shared/facebook/facebook.module';
import { FacebookService } from './shared/facebook/facebook.service';
import { OutsideClickEvent } from './shared/events/outside-click.event';
import { offcanvasReducer } from './shared/ui/offcanvas/offcanvas.state';

import { AppComponent } from './app.component';
import { ToggleFieldComponent } from './shared/form/fields/toggle-field/toggle-field.component';

@NgModule({
	declarations: [
		AppComponent,
		ToggleFieldComponent,
	],
	imports: [
		BrowserModule,
		TekklBrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpModule,
		AuthenticationModule,
		AppRoutingModule,
		EventsModule,
		StoreModule.provideStore({ offcanvas: offcanvasReducer })
	],
	providers: [
		Config,
		/*
		 * The following services are registered at application root level and not
		 * via the modules they ship with, because those modules are also being imported
		 * by lazy loaded modules, which would cause those service to be reinstantitated 
		 * in those module's child injectors.
		 * See: https://angular.io/docs/ts/latest/cookbook/ngmodule-faq.html#!#q-lazy-loaded-module-provider-visibility
		 */
		NotificationService,
		{ provide: EVENT_MANAGER_PLUGINS, useClass: OutsideClickEvent, multi: true },
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
	