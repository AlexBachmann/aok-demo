/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Element, Text } from '@angular/compiler/src/ml_parser/ast';

export interface XmlAttributes {
	name?: string;
	type?: string;
	label?: string;
	description?: string;
	required?: string;
	default?: any;
	minLength?: number;
	maxLength?: number;
	placeholder?: string;
	class?: string;
	validation?: string;
	value?: any;
}

export class XmlParser {
	protected findElementsByName(elements: any[], name: string, recursive: boolean = false) {
		var matches = [];
		for (var element of elements) {
			if (element instanceof Element && element.name.toLowerCase() == name) {
				matches.push(element);
			}
			if (recursive && element instanceof Element && element.children.length) {
				var childMatches = this.findElementsByName(element.children, name, recursive);
				if (childMatches.length) {
					matches.concat(childMatches);
				}
			}
		}

		return matches;
	}
	protected getAttributeByName(element: Element, name: string) {
		for (var attribute of element.attrs) {
			if (attribute.name === name) {
				return attribute.value;
			}
		}
		return null;
	}
	protected getAttributesObject(element: Element): XmlAttributes {
		var attributes = {};
		for (var attribute of element.attrs) {
			attributes[attribute.name] = attribute.value;
		}

		return attributes;
	}
	protected getText(element: Element){
		var text = '';
		for(var child of element.children){
			if(child instanceof Text){
				text += child.value;
			}
			if(child instanceof Element){
				text += this.getText(child);
			}
		}
		return text;
	}
}