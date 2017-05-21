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
	selector: 'tekkl-radio-field',
	templateUrl: './radio-field.component.html',
	styleUrls: ['./radio-field.component.sass']
})
export class RadioFieldComponent implements OnInit {
	@Input() control: FormControl;
	@Output() change: EventEmitter<any> = new EventEmitter();
	onChange($event){
		this.change.emit($event.target.value);
	}
	ngOnInit() {
	}
}
