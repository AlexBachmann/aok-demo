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
import { FormsService } from './forms.service';
import { HiddenFieldComponent } from './fields/hidden-field/hidden-field.component';
import { TextFieldComponent } from './fields/text-field/text-field.component';
import { TextareaFieldComponent } from './fields/textarea-field/textarea-field.component';
import { SelectFieldComponent } from './fields/select-field/select-field.component';
import { RadioFieldComponent } from './fields/radio-field/radio-field.component';
import { CheckboxFieldComponent } from './fields/checkbox-field/checkbox-field.component';
import { FieldComponent } from './fields/field/field.component';
import { InputDebounceComponent } from './input-debounce/input-debounce.component';
import { UiModule } from '../ui/ui.module';

@NgModule({
	imports: [
		CommonModule,
		NgFormsModule,
		ReactiveFormsModule,
		UiModule
	],
	declarations: [
		FieldErrorComponent, 
		HiddenFieldComponent, 
		TextFieldComponent, 
		TextareaFieldComponent, 
		SelectFieldComponent, 
		RadioFieldComponent, 
		CheckboxFieldComponent, 
		FieldComponent,
		InputDebounceComponent
	],
	providers: [ FormsService ],
	exports: [
		NgFormsModule,
		ReactiveFormsModule,
		FieldComponent,
		FieldErrorComponent, 
		HiddenFieldComponent, 
		TextFieldComponent, 
		TextareaFieldComponent, 
		SelectFieldComponent, 
		RadioFieldComponent, 
		CheckboxFieldComponent, 
		InputDebounceComponent
	]
})
export class FormsModule { }
