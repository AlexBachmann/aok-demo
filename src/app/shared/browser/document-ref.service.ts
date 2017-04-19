/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Injectable } from '@angular/core';

function _document() : any {
   // return the global native browser document object
   return document;
}
@Injectable()
export class DocumentRef {
	get nativeDocument() : any {
		return _document();
	}
}
