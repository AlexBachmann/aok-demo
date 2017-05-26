/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { StringHelper } from './string-helper';

describe('StringHelper class', () => {
	let stringHelper: StringHelper;

	it('should correctly convert strings and numbers to booleans', () => {
		expect(StringHelper.toBoolean('true')).toBe(true);
		expect(StringHelper.toBoolean('1')).toBe(true);
		expect(StringHelper.toBoolean('randmom String')).toBe(false);
		expect(StringHelper.toBoolean('0')).toBe(false);
		expect(StringHelper.toBoolean(1)).toBe(true);
		expect(StringHelper.toBoolean(2949)).toBe(true);
		expect(StringHelper.toBoolean(0)).toBe(false);
	});
	it('should correctly add string paddings', () => {
		expect(StringHelper.leftPad('2')).toBe('02');
		expect(StringHelper.leftPad(2)).toBe('02');
		expect(StringHelper.leftPad('14', 5)).toBe('00014');
		expect(StringHelper.leftPad('28', 10, 'a')).toBe('aaaaaaaa28');
		expect(StringHelper.leftPad(1024, 3)).toBe('1024');
	});
});