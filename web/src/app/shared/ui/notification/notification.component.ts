/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { Component, OnInit, Input, Output, ElementRef, Renderer, EventEmitter } from '@angular/core';
import { NotificationService } from './notification.service';
import { Config } from '../../../configuration.service';
import defaultConfig from './config';

 @Component({
 	selector: 'tekkl-notification',
 	templateUrl: './notification.component.html',
 	styles: [':host{display: none}']
 })
 export class NotificationComponent implements OnInit {
 	private active: boolean = false
	private timeoutID

 	@Input() id: string
 	@Input() type: string
 	@Input() duration: number | null = null
 	@Input() submitText: string
 	@Input() cancelText: string
 	@Input() forbitClose: boolean

 	@Output() onSubmit = new EventEmitter()
	@Output() onCancel = new EventEmitter()
 	constructor(
 		private el: ElementRef, 
 		private renderer: Renderer,
 		public service: NotificationService,
 		private config: Config
 	) { 
 		this.config.load('notification', defaultConfig, false);
 	}

 	ngOnInit() {
 		if(this.duration === null){
 			this.duration = this.config.get('notification.duration');
 		}
 	}

 	getMessage():string{
 		var node = this.el.nativeElement.childNodes[0];
 		return node.nodeValue;
 	}

 	getType():string {
 		return (this.type) ? this.type : 'info';
 	}

 	setType(type: string){
 		this.type = type;
 	}

 	isActive():boolean{
 		return this.active;
 	}

 	activate(){
		if (this.timeoutID) clearTimeout(this.timeoutID);
		this.timeoutID = setTimeout(() => {
			this.active = true
			if(this.getDuration() !== 0){
				this.deactivateAfter(this.getDuration());
			}
		});
	}

	deactivate(){
		if (this.timeoutID) clearTimeout(this.timeoutID);
		this.timeoutID = setTimeout(() => {
			this.active = false;
			this.timeoutID = setTimeout(() => this.remove(), 1000);
		});
	}

	remove(){
		this.service.remove(this);
	}

	submit(){
		this.onSubmit.emit(null);
		this.deactivate();
	}

	cancel(){
		this.onCancel.emit(null);
		this.deactivate();
	}
	
	deactivateAfter(timeout: number){
		clearTimeout(this.timeoutID);
		this.timeoutID = setTimeout(() => this.deactivate(), timeout);
	}

	getSubmitText():string{
		return this.submitText;
	}

	getCancelText():string {
		return this.cancelText;
	}

	getDuration():number{
		return Number(this.duration);
	}

	allowClose():boolean {
		return !this.forbitClose;
	}
 }
