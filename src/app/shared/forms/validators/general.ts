/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Validators as ng2Validators, FormControl } from '@angular/forms';
import { Field } from '../models/field';

export class Validators extends ng2Validators {
	static email(control: FormControl): { [key: string]: any } {
		// Ignore empty fields => use 'required' validation for these cases
		if(!control.value) return;
		var regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
		if (!regex.test(control.value)) {
			return { 'email': true };
		}
	}
	static sameAs(name: string, field: Field) {
		return function(control: FormControl){
			// Ignore empty fields => use 'required' validation for these cases
			if(!control.value) return;
			var referenceField = field.getForm().getField(name);
			if(!referenceField){
				throw new Error('The form does not have a field with the name "' + name + '" that the field "' + field.getName() + '" can be compared to.');
			}
			if(control.value != referenceField.getControl().value){
				return { 'sameAs': { 'name': name } };
			}
		}
	}
}