/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Registry } from '../utils/registry';

export class User extends Registry {
	public id: number
	constructor(data) {
		super(data)
		this.id = this.get('id') || 0;
	}
	getAvatar(){
		return this.get('avatar')|| 'loop-one-logo.png';
	}
}