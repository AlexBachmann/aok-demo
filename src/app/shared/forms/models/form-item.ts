/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Form } from './form';

export class FormItem {
	protected requiredProperties: string[] = ['name'];
	protected name: string;

	constructor(protected data: {}, protected form: Form) {

		for (var property in data) {
			this[property] = data[property];
		}

		for (var requiredProperty of this.requiredProperties) {
			if (!this[requiredProperty]) {
				throw new Error('Missing property for FormItem: ' + requiredProperty);
			}
		}
	}
	getName() {
		return this.name;
	}
	getForm(){
		return this.form;
	}
	getFormGroup(){
		return this.form.getControlGroup();
	}
}