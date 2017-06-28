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
import { FormsModule as NgFormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldErrorComponent } from './field-error/field-error.component';
import { TextFieldComponent } from './fields/text-field/text-field.component';
import { TextareaFieldComponent } from './fields/textarea-field/textarea-field.component';
import { SelectFieldComponent } from './fields/select-field/select-field.component';
import { RadioFieldComponent } from './fields/radio-field/radio-field.component';
import { CheckboxFieldComponent } from './fields/checkbox-field/checkbox-field.component';
import { InputDebounceComponent } from './input-debounce/input-debounce.component';
import { VerticalSlideModule } from '../ui/vertical-slide/vertical-slide.module';

@NgModule({
	imports: [
		CommonModule,
		NgFormsModule,
		ReactiveFormsModule,
		VerticalSlideModule
	],
	declarations: [
		FieldErrorComponent, 
		TextFieldComponent, 
		TextareaFieldComponent, 
		SelectFieldComponent, 
		RadioFieldComponent, 
		CheckboxFieldComponent, 
		InputDebounceComponent
	],
	exports: [
		NgFormsModule,
		ReactiveFormsModule,
		FieldErrorComponent,
		TextFieldComponent, 
		TextareaFieldComponent, 
		SelectFieldComponent, 
		RadioFieldComponent, 
		CheckboxFieldComponent, 
		InputDebounceComponent
	]
})
export class FormsModule { }
