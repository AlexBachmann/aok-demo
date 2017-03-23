/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { config } from '../config';
import { Injectable } from '@angular/core';
import { Registry } from './lib/utils/registry';

@Injectable()
export class Config extends Registry {
	constructor(){
		super(config);
	}
}