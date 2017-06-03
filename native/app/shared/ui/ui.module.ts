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
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { CardComponent } from './card/card.component';
import { CardMessageComponent } from './card/card-message/card-message.component';

@NgModule({
	imports: [
		CommonModule,
		NativeScriptModule
	],
	declarations: [
		CardComponent,
		CardMessageComponent
	],
	exports: [
		CardComponent,
		CardMessageComponent
	]
})
export class UiModule { }