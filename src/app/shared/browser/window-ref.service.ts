/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Injectable } from '@angular/core';

function _window() : any {
   // return the global native browser window object
   return window;
}
@Injectable()
export class WindowRef {
	get nativeWindow() : any {
		return _window();
	}
}
