/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
**/

import { Component, ElementRef } from '@angular/core';

 @Component({
 	selector: 'tekkl-page-title',
 	template: '<ng-content></ng-content>',
 	styles: [':host{display: none}']
 })
 export class PageTitleComponent{
 	constructor(private el: ElementRef){}
 	getTitle():string{
 		var node = this.el.nativeElement.childNodes[0];
 		return node.nodeValue;
 	}
 }