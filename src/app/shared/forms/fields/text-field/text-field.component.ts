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
	selector: 'tekkl-text-field',
	templateUrl: './text-field.component.html',
	styleUrls: ['./text-field.component.sass']
})
export class TextFieldComponent implements OnInit {
	@Input() field: Field;
	@Input() label: string;
	@Output() change: EventEmitter<any> = new EventEmitter();
	onChange($event){
		this.change.emit($event.target.value);
	}
	ngOnInit() {
	
	}
	hasValue(){
		return this.field.getControl().value ? true : false
	}
}
