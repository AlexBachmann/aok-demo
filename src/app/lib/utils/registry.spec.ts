import { TestBed, async } from '@angular/core/testing';
import { Registry } from './registry';

describe('Registry class', () => {
	var registry;
	beforeEach(() => {
		registry = new Registry({
			layer1: {
				layer2: 'value1_2',
				layer3: 'value_1_3'
			},
			layer4: 'value4'
		});
	});

	it('should correctly retrieve values', () => {
		expect(registry.get('layer1')).toEqual({
			layer2: 'value1_2',
			layer3: 'value_1_3'
		});
		expect(registry.get('layer1.layer2')).toEqual('value1_2');
		expect(registry.get('layer1.layer3')).toEqual('value_1_3');
		expect(registry.get('layer4')).toEqual('value4');
		expect(registry.get('layer5')).toEqual(undefined);
		expect(registry.get('layer5', 'defaultValue')).toEqual('defaultValue');
		expect(registry.get('layer6.layer7')).toEqual(undefined);
	});

	it('should correctly set values', () => {
		expect(registry.get('layer5')).toEqual(undefined);
		registry.set('layer5', 'testValue');
		expect(registry.get('layer5', 'defaultValue')).toEqual('testValue');
		registry.set('layer6.layer7', 'testValue2');
		expect(registry.get('layer6.layer7', 'defaultValue')).toEqual('testValue2');
		registry.set('layer8.layer9.layer10', 'testValue3');
		expect(registry.get('layer8.layer9.layer10', 'defaultValue')).toEqual('testValue3');
	});

	it('should correctly overwrite values', () => {
		expect(registry.get('layer1.layer2')).toEqual('value1_2');
		registry.set('layer1', 'testValue');
		expect(registry.get('layer1.layer2')).toEqual(undefined);
		expect(registry.get('layer1')).toEqual('testValue');
	});

});