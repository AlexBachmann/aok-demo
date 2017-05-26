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
	selector: 'tekkl-select-field',
	templateUrl: './select-field.component.html',
	styleUrls: ['./select-field.component.sass']
})
export class SelectFieldComponent implements OnInit {
	@Input() control: FormControl;
	@Input() label: string;
	@Input() name: string;
	@Output() change: EventEmitter<any> = new EventEmitter();
	onChange($event){
		this.change.emit($event.target.value);
	}
	ngOnInit() {
	}
}
