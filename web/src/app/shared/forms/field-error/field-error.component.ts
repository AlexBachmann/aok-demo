/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Component({
	selector: 'tekkl-field-error',
	templateUrl: './field-error.component.html',
	styleUrls: ['./field-error.component.sass']
})
export class FieldErrorComponent implements OnInit {
	@Input() control: AbstractControl;
	@Input() type: string;
	@Input() message: string;
	constructor() { }

	ngOnInit() {
	}

}
