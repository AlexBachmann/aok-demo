/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
**/
import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { fireEvent } from '../../lib/utils/event-helper';

@Directive({
	selector: '[ellipsis]'
})
export class EllipsisDirective implements OnInit {
	@Input() ellipsis: string
	@Input() rows: number
	@Input() break: string = 'word'
	originalText: string
	constructor(private el: ElementRef) {}
	ngOnInit(){
		this.initInput();
		this.originalText = this.el.nativeElement.textContent;
		this.applyEllipsis();
	}
	initInput(){
		if(!this.ellipsis) this.ellipsis = '...';
		if(!this.rows) this.rows = 1;
		if(!this.break) this.break = 'word';
	}
	applyEllipsis(){
		var rows = 0;
		var height = 0;
		var lastHeight = 0;
		for(var i = 0; i < this.originalText.length; i++){
			this.el.nativeElement.textContent = this.originalText.substr(0, i+1);
			height = this.el.nativeElement.clientHeight;
			if(height > lastHeight){
				lastHeight = height;
				rows++;
			}
			if(rows > this.rows){
				if(this.break != 'word'){
					var j = 1;
					while(true){
						this.el.nativeElement.textContent = this.originalText.substr(0, i - j) + ' ' + this.ellipsis;
						height = this.el.nativeElement.clientHeight;
						if(height < lastHeight) break;
						j++;
					}
				}else{
					var text = this.el.nativeElement.textContent;
					while(true){
						text = this.removeLastWord(text);
						this.el.nativeElement.textContent = text + ' ' + this.ellipsis;
						height = this.el.nativeElement.clientHeight;
						if(height < lastHeight) break;
					}
				}
			}
		}
	}
	removeLastWord(text: string):string{
		var char = '';
		while(text.length){
			char = text.slice(-1);
			text = text.substr(0, text.length - 1);
			if(char == ' ') break;
		}
		return text;
	}
}