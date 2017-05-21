/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'tekkl-text-field',
	templateUrl: './text-field.component.html',
	styleUrls: ['./text-field.component.sass']
})
export class TextFieldComponent implements OnInit {
	@Input() control: FormControl;
	@Input() label: string;
	@Input() name: string;
	@Input() type: string = 'text';
	@Output() change: EventEmitter<any> = new EventEmitter();
	onChange($event){
		this.change.emit($event.target.value);
	}
	ngOnInit() {
	
	}
	hasValue(){
		return this.control.value ? true : false
	}
}
