/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
**/
import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'tekkl-form-view',
	templateUrl: './form-view.component.html',
	styleUrls: ['./form-view.component.sass']
})
export class FormViewComponent implements OnInit {
	@Input() background: string;
	constructor() { }

	ngOnInit() {
		console.log(this.background);
	}
}
