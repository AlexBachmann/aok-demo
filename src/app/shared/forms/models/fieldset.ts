/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Form } from './form';
import { FormFieldContainer } from './form-field-container';
import { Field } from './field';

export class Fieldset extends FormFieldContainer {
	protected requiredProperties = ['name'];
	public form: Form;

	constructor(protected data: {}, form: Form){
		super();
		this.form = form;

		for (var property in data) {
			this[property] = data[property];
		}

		for (var requiredProperty of this.requiredProperties) {
			if (!this[requiredProperty]) {
				throw new Error('Missing property for FormItem: ' + requiredProperty);
			}
		}
	}
	addField(field:Field){
		super.addField(field);
		this.form.addField(field);
	}
	getName(){
		return this['name'];
	}
}