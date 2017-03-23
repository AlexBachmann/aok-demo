/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Form } from '../models/form';
import { Field } from '../models/field';
import { Fieldset } from '../models/fieldset';
import { TextField } from '../models/text-field';
import { TextareaField } from '../models/textarea-field';
import { SelectField } from '../models/select-field';
import { HiddenField } from '../models/hidden-field';
import { XmlParser as NgXmlParser } from '@angular/compiler/src/ml_parser/xml_parser';
import { Element, Text } from '@angular/compiler/src/ml_parser/ast';
import { XmlParser } from '../../../lib/utils/xml-parser';

export class XmlFormParser extends XmlParser {
	protected form: Form;
	constructor(private xml: string) {
		super();
	}
	public parseXmlString() {
		var xmlTree = new NgXmlParser().parse(this.xml, '');
		var formDefinition = this.findElementsByName(xmlTree.rootNodes, 'form')[0];

		var form = this.getFormFromDefinition(formDefinition);
		return form;
	}
	private getFormFromDefinition(formDefinition: Element) {
		var attributes = this.getAttributesObject(formDefinition);
		this.form = new Form(attributes);
		for (var child of formDefinition.children) {
			if (!(child instanceof Element)) continue;
			switch (child.name.toLowerCase()) {
				case 'fieldset':
					var fieldset = this.parseFieldset(child);
					this.form.addFieldset(fieldset);
					break;
				case 'field':
					var field = this.parseField(child);
					this.form.addField(field);
					break;
			}
		}
		return this.form;
	}
	private parseFieldset(fieldsetDefinition: Element): Fieldset {
		if (fieldsetDefinition.name.toLowerCase() !== 'fieldset') return null;

		var attributes = this.getAttributesObject(fieldsetDefinition);
		var fieldset = new Fieldset(attributes, this.form);
		for (var child of fieldsetDefinition.children) {
			if (!(child instanceof Element)) continue;
			var field = this.parseField(child);
			fieldset.addField(field);
		}
		return fieldset;
	}
	private parseField(fieldDefinition: Element): Field {
		if (fieldDefinition.name.toLowerCase() !== 'field') return null;
		var attributes = this.getAttributesObject(fieldDefinition);
		var field = null;
		switch (attributes['type'].toLowerCase()) {
			case 'text':
			case 'password':
			case 'email':
				field = new TextField(attributes, this.form);
				break;
			case 'list':
				field = new SelectField(attributes, this.form);
				for (var child of fieldDefinition.children) {
					if (!(child instanceof Element)) continue;
					var option = this.parseOption(child);
					field.addOption(option.value, option.text, option.isDefault);
				}
				if(attributes['default'] !== undefined){
					field.setDefault(attributes['default']);
				}
				field.updateControl();
				break;
			case 'numberlist':
				field = new SelectField(attributes, this.form);
				field.addNumberOptions(attributes['min'], attributes['max'], attributes['step']);
			case 'hidden':
				field = new HiddenField(attributes, this.form);
				break;
		}
		return field;
	}
	private parseOption(optionDefinition: Element) {
		var attributes = this.getAttributesObject(optionDefinition);
		return {
			value: attributes.value,
			text: this.getText(optionDefinition),
			isDefault: (attributes.default !== undefined) ? true : false
		};
	}
}