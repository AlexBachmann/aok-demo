/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Field } from './field';
import { FormControl } from '@angular/forms';
import { Form } from './form';
import { Validators } from '../validators/general';

export class SelectField extends Field {
	public options = new Map();
	public initialOption = null;

	public constructor(properties: {}, form: Form){
		super(properties, form);
	}
	protected createControl() {
		var fieldValidators = this.getValidators(this.data);
		var defaultOption = this.getDefault();
		var defaultValue = (defaultOption) ? defaultOption.value : '';
		switch (fieldValidators.length) {
			case 0:
				var control = new FormControl(defaultValue);
				break;
			case 1:
				var control = new FormControl(defaultValue, fieldValidators[0]);
				break;
			default:
				var control = new FormControl(defaultValue, Validators.compose(fieldValidators));
				break;
		}
		this.control = control;

		return this.control;
	}
	public updateControl(){
		this.createControl();
	}
	public addOption(value, text, isDefault?) {
		this.options.set(String(value), {
			value: value,
			text: text
		});
		if(isDefault){
			this.setDefault(value);
		}
		return this;
	}
	public getOptions() {
		return this.options;
	}
	public getOptionsArray(){
		var options = [];
		this.options.forEach(function(option){
			options.push(option);
		});
		return options;
	}
	public hasOption(value: any){
		return this.options.has(String(value));
	}
	public getOption(value){
		return this.options.get(String(value))
	}
	public setDefault(value: any) {
		var oldDefaultOption = this.getDefault();
		if (oldDefaultOption && this.hasOption(value)) {
			oldDefaultOption.isDefault = false;
			this.options.set(oldDefaultOption.value, oldDefaultOption);
		}
		if(this.hasOption(value)){
			var data = this.options.get(value);
			data.isDefault = true;
			this.options.set(value, data);
		}
		return this;
	}
	public getDefault() {
		if(!this.options) return null;
		var defaultOption = null;
		this.options.forEach(function(option) {
			if (option.isDefault) defaultOption = option;
		});
		return defaultOption;
	}
	public getSelected() {
		return this.getOption(this.getControl().value);
	}
	public clear(exceptions){
		var exceptions = (exceptions) ? exceptions : [];
		this.options.forEach((option) => {
			if(exceptions.indexOf(option.value) < 0){
				this.options.delete(option.value);
			}
		});
		return this;
	}
	public addNumberOptions(min, max, step) {
		if (min === undefined || max === undefined) {
			throw new Error('A form field of the type "numberlist" must contain the attributes "min" and "max"');
		}
		min = parseInt(min);
		max = parseInt(max);
		step = (step === undefined) ? 1 : parseInt(step);
		var loopCounter = 0;
		var numValue = min;
		while (numValue <= max) {
			loopCounter++;
			if (loopCounter > 200) {
				throw new Error('Your number list with the attributes min: "' + min + '" and "' + max + '" generates more than 200 loops. Please opt for different settings.')
			}
			this.addOption(numValue, numValue);
			numValue += step;
		}
		return this;
	}
}