/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
export class Registry {
	private store
	constructor(store = null){
		this.store = store || {};
	}
	get(key: string, defaultValue: string | number | undefined | null | boolean  = undefined): any {
		var ref = this.store,
			keys = key.split('.');

		keys.forEach(function(node){
			if(ref && ref[node]){
				ref = ref[node];
			}else {
				ref = undefined;
			}
		});
		return (ref !== undefined) ? ref : defaultValue;
	}
	set(key: string, value: string|number|undefined|null|boolean, overwrite: boolean = true):void {	
		function setObjectProperty(key, value, object = undefined){
			var keys = key.split('.'),
				key = keys.shift(),
				object = object || {};

			if(!object[key] && keys.length){
				object[key] = setObjectProperty(keys.join('.'), value, {});
			}else if(object[key] && keys.length){
				object[key] = setObjectProperty(keys.join('.'), value, object[key]);
			}else{
				if(overwrite || object[key] == undefined){
					object[key] = value;
				}
			}
			return object;
		}

		this.store = setObjectProperty(key, value, this.store);
	}
	load(key: string, value: any, overwrite: boolean = true){
		if((['string', 'number', 'undefined', 'boolean'].indexOf(typeof(value))  >= 0) || value === null){
			this.set(key, value, overwrite);
		}else{
			if(typeof(value) != 'object'){
				throw new Error('Cannot load an ' + typeof(value) + ' into position ' + key);
			}
			for (let prop in value){
				let newKey = key + '.' + prop;
				this.load(newKey, value[prop], overwrite);
			}
		}
	}
	getStore(){
		return this.store;
	}
	toJSON(): string {
		return JSON.stringify(this.store);
	}
	loadJSON(json: string):void {
		this.store = JSON.parse(json);
	}
}