/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
export class StringHelper {
	static toBoolean(str: string|number):boolean{
		if(typeof(str) == 'string'){
			if( str.toLowerCase() === 'true' || str === '1' ) return true;
		}else if(typeof(str) == 'number'){
			if(str !== 0) return true;
		}
		return false;
	}
	static leftPad(str: string|number, length: number = 2, pad: string = '0'):string{
		str = '' + str;
		while(str.length < length){
			str = pad + str;
		}
		return str;
	}
}