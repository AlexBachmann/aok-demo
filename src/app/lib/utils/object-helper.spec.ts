/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { ObjectHelper } from './object-helper';
describe('ObjectHelper class', function(){
	it('should simply return non-objects', () => {
		expect(ObjectHelper.clone('Hello')).toBe('Hello');
		expect(ObjectHelper.clone(2015)).toBe(2015);
		expect(ObjectHelper.clone(null)).toBe(null);
	});
	it('should correctly copy dates', () => {
		var date = new Date();
		var clone = ObjectHelper.clone({date : date});
		expect(clone.date.getTime()).toBe(date.getTime());
	});
	it('should correctly copy arrays', () => {
		var date = new Date();
		var arr = ['Hello', 2, 'Kitty', {date : date}];
		var clone = ObjectHelper.clone(arr);
		expect(clone).toEqual(arr);
		expect(clone.length).toBe(4);
		expect(clone[0]).toBe('Hello');
		expect(clone[1]).toBe(2);
		expect(clone[2]).toBe('Kitty');
		expect(clone[3].date.getTime()).toBe(date.getTime());
	});
	it('should creectly copy deep objects', () => {
		var date = new Date();
		var object = {
			first: {
				second: {
					third: {
						date: date
					}
				}
			}
		};
		var clone = ObjectHelper.clone(object);
		expect(clone).toEqual(object);
		expect(clone.first.second.third.date.getTime()).toBe(date.getTime());
	});
});