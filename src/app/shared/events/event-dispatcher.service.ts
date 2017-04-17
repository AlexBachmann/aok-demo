import { Injectable, EventEmitter } from '@angular/core';
import { Event } from './event.class';

@Injectable()
export class EventDispatcher {
	private events: Map<string, EventEmitter<Event>> = new Map();
	
	public subscribe(name: string, fn: Function){
		this.getEvent(name).subscribe(fn);
	}
	public emit(name: string, event: Event ){
		this.getEvent(name).emit(event);
	}
	private getEvent(name: string): EventEmitter<Event>{
		if(!this.events.get(name)){
			this.events.set(name, new EventEmitter());
		}
		return this.events.get(name);
	}
}
