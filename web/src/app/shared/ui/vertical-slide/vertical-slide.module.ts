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
import { VerticalSlideComponent } from './vertical-slide.component';

@NgModule({
	imports: [
	CommonModule
	],
	declarations: [ VerticalSlideComponent ],
	exports: [ VerticalSlideComponent ]
})
export class VerticalSlideModule { }
