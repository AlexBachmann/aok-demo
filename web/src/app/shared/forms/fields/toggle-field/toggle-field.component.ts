import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'tekkl-toggle-field',
	templateUrl: './toggle-field.component.html',
	styleUrls: ['./toggle-field.component.sass']
})
export class ToggleFieldComponent implements OnInit {
	@Input() active: boolean = false
	@Output() change: EventEmitter<boolean> = new EventEmitter()
	constructor() { }

	ngOnInit() {
	}
	toggle(){
		console.log('here');
		this.active = !this.active;
		this.change.emit(this.active);
	}
}
