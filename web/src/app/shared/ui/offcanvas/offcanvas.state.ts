import { ActionReducer, Action } from '@ngrx/store';

export const OFFCANVAS_TOGGLE = 'OFFCANVAS_TOGGLE';
export const OFFCANVAS_OPEN = 'OFFCANVAS_OPEN';
export const OFFCANVAS_CLOSE = 'OFFCANVAS_CLOSE';

export function offcanvasReducer(state: boolean = false, action: Action) {
	switch (action.type) {
		case OFFCANVAS_TOGGLE:
			return !state;

		case OFFCANVAS_OPEN:
			return true;

		case OFFCANVAS_CLOSE:
			return false;

		default:
			return state;
	}
}