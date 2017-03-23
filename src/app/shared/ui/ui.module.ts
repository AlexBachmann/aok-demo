import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerticalSlideComponent } from './vertical-slide/vertical-slide.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [ VerticalSlideComponent ],
	exports: [ VerticalSlideComponent ]
})
export class UiModule { }
