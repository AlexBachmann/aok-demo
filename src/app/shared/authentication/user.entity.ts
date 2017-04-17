/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
export class User {
	public id: number;
	private roles: string[] = [];
	constructor(data){
		for(var key in data){
			this[key] = data[key];
		}
	}
	getRoles(){
		return this.roles;
	}
	toJson():string {
		return JSON.stringify(this);
	}
	static fromJson(json:string){
		var data = JSON.parse(json);
		return new User(data);
	}
}