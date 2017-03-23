/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Form } from '../models/form';
import { Field } from '../models/field';
import { Fieldset } from '../models/fieldset';
import { TextField } from '../models/text-field';
import { TextareaField } from '../models/textarea-field';
import { SelectField } from '../models/select-field';
import { HiddenField } from '../models/hidden-field';
import { CheckboxField } from '../models/checkbox-field';
import { RadioField } from '../models/radio-field';

export class FormBuilder {
	protected form: Form;
	private data;
	public getFormFromDataObject(data): Form{
		this.data = data;
		this.form = new Form();
		for(var key in data){
			switch(key){
				case 'fields':
					for (var i = 0; i < data[key].length; i++){
						var field = this.getField(data[key][i]);
						this.form.addField(field);
					}
					break;
				case 'fieldsets': 
					for (var i = 0; i < data[key].length; i++){
						var fieldset = this.getFieldset(data[key][i]);
						this.form.addFieldset(fieldset);
					}
					break;
			}
		}
		return this.form;
	}
	public getFieldset(data): Fieldset{
		var fieldset = new Fieldset(data, this.form);
		for (var i = 0; i < data.fields.length; i++){
			var field = this.getField(data.fields[i]);
			fieldset.addField(field);
		}
		return fieldset;
	}
	public getField(data): Field{
		var field = null;
		switch (data.type.toLowerCase()) {
			case 'text':
			case 'password':
			case 'email':
				field = new TextField(data, this.form);
				break;
			case 'list':
				field = new SelectField(data, this.form);
				for (var option of data.options) {
					field.addOption(option.value, option.text, option.isDefault);
				}
				field.updateControl();
				break;
			case 'numberlist':
				field = new SelectField(data, this.form);
				field.addNumberOptions(data['min'], data['max'], data['step']);
			case 'hidden':
				field = new HiddenField(data, this.form);
				break;
			case 'checkbox':
				field = new CheckboxField(data, this.form);
				break;
			case 'radio':
				field = new RadioField(data, this.form);
				break;
		}
		return field;
	}
}