/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Config } from './configuration.service';
import { AppRoutingModule } from './routing.module';
import { AuthenticationModule } from './shared/authentication/authentication.module';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AuthenticationModule,
		AppRoutingModule
	],
	providers: [
		Config
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
	