/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
**/
import { ElementRef } from '@angular/core';

interface DocumentExt extends Document {
	createEventObject()
}
interface ElementExt extends Element {
	fireEvent(type: string, event: Event)
}

declare var document: DocumentExt;

export function fireEvent(el: ElementExt, type: string, bubbles: boolean = true, cancelable: boolean = true, data: any = false){
	var event;
	if ("createEvent" in document) {
		event = document.createEvent("HTMLEvents");
		event.initEvent(type, bubbles, cancelable);
		event.eventName = type;
		if(data){
			event.data = data;
		}
		el.dispatchEvent(event);
	}
	else{
		event = document.createEventObject();
		event.eventName = type;
		event.eventType = type;
		if(data){
			event.data = data;
		}
		el.fireEvent("on" + event.eventType, event);
	}
}