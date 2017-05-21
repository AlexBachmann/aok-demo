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
	selector: 'tekkl-checkbox-field',
	templateUrl: './checkbox-field.component.html',
	styleUrls: ['./checkbox-field.component.sass']
})
export class CheckboxFieldComponent implements OnInit {
	@Input() control: FormControl
	@Input() value: any
	@Input() label: string
	@Input() multiple: any
	@Output() change: EventEmitter<any> = new EventEmitter()
	onChange($event){
		this.change.emit($event.target.value);
	}
	ngOnInit() {
		this.multiple = (typeof(this.multiple) === 'undefined') ? false : true;
		// Cast value to a string;
		this.value = '' + this.value;
		
	}
	toggle($event){
		if(this.isChecked()){
			this.uncheck();
		}else{
			this.check();
		}
	}
	check(){
		if(this.isChecked()) return;
		if(this.multiple){
			var values = this.control.value;
			if(!values || !values.length){
				values = [];
			}
			values.push(this.value);
			this.control.setValue(values);
		}else{
			this.control.setValue(this.value);
		}
	}
	uncheck(){
		if(this.multiple){
			var values = this.control.value;
			if(!values || !values.length){
				values = [];
			}
			var index = values.indexOf(this.value);
			if(index >= 0){
				values.splice(index, 1);
			}
			this.control.setValue(values);
		}else{
			this.control.setValue(null);
		}
	}
	isChecked(){
		var values = this.control.value;
		if(!this.multiple){
			values = [values];
		}else if(!values || !values.length){
			values = [];
		}
		return (values.indexOf(this.value) >= 0);
	}
}
