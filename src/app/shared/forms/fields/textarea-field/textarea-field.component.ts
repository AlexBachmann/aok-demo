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
	selector: 'tekkl-textarea-field',
	templateUrl: './textarea-field.component.html',
	styleUrls: ['./textarea-field.component.sass']
})
export class TextareaFieldComponent implements OnInit {
	@Input() field: Field;
	@Output() change: EventEmitter<any> = new EventEmitter();
	onChange($event){
		this.change.emit($event.target.value);
	}
	ngOnInit() {
	}
}
