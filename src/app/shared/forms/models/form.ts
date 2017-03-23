/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { FormGroup } from '@angular/forms';
import { FormFieldContainer } from './form-field-container';
import { Fieldset } from './fieldset';
import { FormItem } from './form-item';
import { Field } from './field';

export class Form extends FormFieldContainer{

	public formItems: any[] = [];
	public formItemMap = new Map();
	public fields: Field[] = [];
	public fieldMap = new Map();
	public fieldsets: Fieldset[] = [];
	public fieldsetMap = new Map();
	protected controlGroup: FormGroup;

	constructor(properties?, formItems?: any[]) {
		super();
		if (formItems && formItems.length) {
			for (var item of formItems) {
				this.addFormItem(item);
			}
		}
	}
	addFormItem(formItem: FormItem) {
		if (formItem instanceof Field) {
			this.addField(formItem);
		} else if (formItem instanceof Fieldset) {
			this.addFieldset(formItem);
		}
		this.formItems.push(formItem);
		this.formItemMap.set(formItem.getName(), formItem);
	}
	getFormItem(name: string) {
		return this.formItemMap.get(name);
	}
	addFieldset(fieldset: Fieldset) {
		this.fieldsets.push(fieldset);
		this.fieldsetMap.set(fieldset.getName(), fieldset);
	}
	getFieldset(name: string) {
		return this.fieldsetMap.get(name);
	}
	load(fields: {[key:string]: any}){
		for(var key in fields){
			this.loadField(key, fields[key]);
		}
	}
	loadField(key, value){
		if(typeof(value) == 'string' || typeof(value) == 'number'){
			var control = this.getControl(key);
			if(control){
				control.setValue(value);
			}
		}else if(typeof(value) == 'object'){
			for(var k in value){
				this.loadField(k, value[k]);
			}
		}
	}
}