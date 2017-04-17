import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventDispatcher } from './event-dispatcher.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [ EventDispatcher ],
  declarations: []
})
export class EventsModule { }
