/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { UrlResolver } from './url-resolver.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

export class LoginUrlResolver implements UrlResolver {
	resolve(url: string):Observable<string>{
		if(url.substr(0, 8) == '/backend'){
			return Observable.of('/backend/login');
		}else{
			return Observable.of('/user/login');
		}
	}
}