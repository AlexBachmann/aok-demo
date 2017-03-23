/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, OnInit, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'tekkl-input-debounce',
  templateUrl: './input-debounce.component.html',
  styleUrls: ['./input-debounce.component.sass']
})
export class InputDebounceComponent implements OnInit {
	@Input() placeholder: string
	@Input() delay: number = 300
	@Input() value: string = ''
	@Output() onChange: EventEmitter<any> = new EventEmitter()
	constructor(private elementRef: ElementRef) { 
		const eventStream = Observable.fromEvent(elementRef.nativeElement, 'keyup')
			.map(() => this.value)
			.debounceTime(this.delay)
			.distinctUntilChanged();

		eventStream.subscribe(input => {
			this.onChange.emit(input);
			this.value = input;
		});
	}

	ngOnInit() {
	}

	getInitialValue(){
		return this.value;
	}
}
