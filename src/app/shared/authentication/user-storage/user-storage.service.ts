/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { InjectionToken } from '@angular/core';
import { User } from '../user.entity';

export abstract class UserStorage {
	abstract storeUser(user: User);
	abstract getUser(): User;
	abstract deleteUser();
}