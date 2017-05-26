/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Validators as ng2Validators, FormControl, FormGroup } from '@angular/forms';

export class Validators extends ng2Validators {
	static email(control: FormControl): { [key: string]: any } {
		// Ignore empty fields => use 'required' validation for these cases
		if(!control.value) return;
		var regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
		if (!regex.test(control.value)) {
			return { 'email': true };
		}
	}
	static matching(names: string[]){
		return function(group: FormGroup){
			var matching = true,
				prev = undefined;

			for(var name of names){
				var control = group.get(name);
				if(!control){
					throw new Error('The form does not have a field with the name ' + name + '. Comparison failed.');
				}
				if(!control.value) continue;

				if(prev !== undefined){
					if(prev != control.value){
						matching = false;
						break;
					}
				}
				prev = control.value;
			}
			if(!matching){
				return { 'matching': { names: names } };
			}
		}
	}
}