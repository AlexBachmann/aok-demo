/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { FormItem } from './form-item';
import { FormControl } from '@angular/forms';
import { Form } from './form';
import { Validators } from '../validators/general';

export class Field extends FormItem {
	protected control: FormControl;

	public constructor(data: {}, form: Form) {
		super(data, form);
		this.createControl();
	}
	public hasControl() {
		return (this.control) ? true : false;
	}
	public getControl() {
		return this.control;
	}
	public setDefault(value: any){
		this['default'] = value;
	}
	public getDefault(){
		return ( this['default'] ) ? this['default'] : null;
	}
	protected createControl(){
		var fieldValidators = this.getValidators(this.data);
		switch(fieldValidators.length){
			case 0:
				var control = new FormControl(this.getDefault());
				break;
			case 1:
				var control = new FormControl(this.getDefault(), fieldValidators[0]);
				break;
			default:
				var control = new FormControl(this.getDefault(), Validators.compose(fieldValidators));
				break;
		}
		this.control = control;

		return this.control;
	} 
	protected getValidators(data):any[]{
		var fieldValidators = [];
		var validators = data.validators;
		if(validators){
			if(validators.hasOwnProperty('required')){
				fieldValidators.push(Validators.required);
			}
			if(validators.hasOwnProperty('minlength')){
				fieldValidators.push(Validators.minLength(Number(validators['minlength'])));
			}
			if(validators.hasOwnProperty('maxlength')){
				fieldValidators.push(Validators.maxLength(Number(validators['maxlength'])));
			}
			if(validators.hasOwnProperty('email')){
				fieldValidators.push(Validators.email);
			}
			if(validators.hasOwnProperty('sameAs')){
				fieldValidators.push(Validators.sameAs(validators['sameAs'], this));
			}
		}
			
		return fieldValidators;
	}
}