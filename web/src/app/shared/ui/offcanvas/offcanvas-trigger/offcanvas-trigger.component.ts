import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { OFFCANVAS_TOGGLE } from '../offcanvas.state';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'tekkl-offcanvas-trigger',
	templateUrl: './offcanvas-trigger.component.html',
	styleUrls: ['./offcanvas-trigger.component.sass']
})
export class OffcanvasTriggerComponent implements OnInit {
	state: Observable<boolean>
	constructor(private store: Store<AppState>) { }

	ngOnInit() {
		this.state = this.store.select('offcanvas');
	}
	toggleOffCanvas(){
 		this.store.dispatch({type: OFFCANVAS_TOGGLE});
 	}
}
