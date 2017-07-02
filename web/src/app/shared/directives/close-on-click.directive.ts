/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
**/
import { Directive, ElementRef } from '@angular/core';
import { fireEvent } from '../../lib/utils/event-helper';

@Directive({
	selector: '[close-on-click]',
	host: {
		'(click)' : 'onClick($event)'
	}
})
export class CloseOnClickDirective {
	constructor(private el: ElementRef) {
		
	}
	onClick(event){
		fireEvent(this.el.nativeElement, 'close');
	}
}