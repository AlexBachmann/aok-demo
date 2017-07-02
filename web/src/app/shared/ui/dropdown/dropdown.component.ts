import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'tekkl-dropdown',
	templateUrl: './dropdown.component.html',
	styleUrls: ['./dropdown.component.sass']
})
export class DropdownComponent implements OnInit {
	@Input() trigger: string = 'hover';
	@Input() position: string = 'center';
	active: boolean;
	isClosing: boolean;
	hide: boolean;
	constructor() { }

	ngOnInit() {
		switch(this.trigger){
			case 'click':
				// leave the value as it is
				break;
			default:
				this.trigger = 'hover';
				break;
		}
	}
	toggle(){
		if(this.trigger != 'click') return;
		this.active = !this.active;
	}
	close(){
		this.active = false;
		this.isClosing = true;
		setTimeout(() => {
			this.isClosing = false;
			this.hide = true;
			setTimeout(() => {this.hide = false;}, 200);
		}, 400);
	}
}
