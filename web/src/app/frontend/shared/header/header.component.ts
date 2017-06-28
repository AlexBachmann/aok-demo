/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../shared/state/app.state';
import { OFFCANVAS_TOGGLE } from '../../../shared/ui/offcanvas/offcanvas.state';

@Component({
 	selector: 'tekkl-header',
 	templateUrl: './header.component.html',
 	styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
 	constructor(
 		private store: Store<AppState>
 	) { 
 	
 	}

 	ngOnInit() {
 	}
 	toggleOffCanvas(){
 		this.store.dispatch({type: OFFCANVAS_TOGGLE});
 	}
}
