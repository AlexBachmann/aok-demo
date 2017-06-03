/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, OnInit, ContentChild } from "@angular/core";

@Component({
    selector: "tekkl-card-message",
    moduleId: module.id,
    templateUrl: "./card-message.component.html",
    styleUrls: ['./card-message.component.css']
})
export class CardMessageComponent implements OnInit {
	@ContentChild('avatar') avatar;
	@ContentChild('text') text;
	@ContentChild('settings') settings;
	constructor(){}
	ngOnInit(){

	}
	getRowDefinition(){
		return 'auto';
	}
	getColumnsDefinition(){
		var columns = [];
		if(this.avatar) columns.push('50');
		if(this.text) columns.push('*');
		if(this.settings) columns.push('10');

		return columns.join(',');
	}
	getCol(type){
		var col = 0;
		if(type == 'avatar') return col;
		if(this.avatar) col ++;
		if(type = 'text') return col;
		if(this.text) col ++;
		if(type = 'settings') return col;
	}
}