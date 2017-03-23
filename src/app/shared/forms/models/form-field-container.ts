/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { FormGroup, FormControl } from '@angular/forms';
import { Field } from './field';

export class FormFieldContainer {
	public fields: Field[] = [];
	public fieldMap = new Map();
	protected controlGroup: FormGroup;
	constructor(){
		this.createControlGroup();
	}
	addControl(name, control: FormControl) {
		this.controlGroup.addControl(name, control);
	}
	protected createControlGroup() {
		this.controlGroup = new FormGroup({});
	}
	getControlGroup() {
		return this.controlGroup;
	}
	getControl(name: string) {
		var field = this.getField(name);
		if(field){
			return field.getControl();
		}else{
			return null;
		}
	}
	addField(field: Field) {
		this.fields.push(field);
		this.fieldMap.set(field.getName(), field);
		if (field.hasControl()) {
			this.addControl(field.getName(), field.getControl());
		}
	}
	getField(name: string): Field {
		if(this.fieldMap.has(name)){
			return this.fieldMap.get(name);
		}else{
			return null;
		}
	}
}