/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Field } from '../../models/field';

@Component({
	selector: 'tekkl-field',
	templateUrl: './field.component.html',
	styleUrls: ['./field.component.sass']
})
export class FieldComponent implements OnInit {
	@Input() field: Field;
	@Output() valueChanged: EventEmitter<any> = new EventEmitter();
	constructor() { }

	ngOnInit() {
	}
	onChange(value){
		this.valueChanged.emit(value);
	}
}
