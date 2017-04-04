/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, Input, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
	selector: 'tekkl-vertical-slide',
	templateUrl: './vertical-slide.component.html',
	styleUrls: ['./vertical-slide.component.sass'],
	animations: [
		trigger('open', [
			state('true' , style({ height: '*', padding: '*', display: '*' })),
			state('false', style({ height: 0, padding: 0, display: 'none' })),
			transition('void <=> *', animate('0ms')),
			transition('* => *', animate('300ms ease-out')),
	    ])
    ],
})
export class VerticalSlideComponent implements OnInit {
	@Input() open = false;
	constructor() { }

	ngOnInit() {
	}
}
