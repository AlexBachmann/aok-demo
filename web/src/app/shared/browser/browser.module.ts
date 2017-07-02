/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
**/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowRef } from './window-ref.service';
import { DocumentRef } from './document-ref.service';
import { CloseOnClickDirective } from '../directives/close-on-click.directive';
import { PageTitleComponent } from '../ui/page-title/page-title.component';

@NgModule({
	imports: [
		CommonModule
	],
	providers: [ WindowRef, DocumentRef ],
	declarations: [ 
		CloseOnClickDirective, 
		PageTitleComponent
	],
	exports: [ 
		CloseOnClickDirective, 
		PageTitleComponent
	]
})
export class BrowserModule { }
