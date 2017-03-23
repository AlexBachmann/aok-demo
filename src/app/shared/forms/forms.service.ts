/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Injectable } from '@angular/core';
import { FormBuilder } from './lib/form-builder';
import { Form } from './models/form';

@Injectable()
export class FormsService {
	constructor() { }
	getFormFromDataObject(data): Form {
		var builder = new FormBuilder();
		var form = builder.getFormFromDataObject(data);
		return form;
	}
}
