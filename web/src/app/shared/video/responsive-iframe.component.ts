import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'tekkl-responsive-iframe',
	templateUrl: './responsive-iframe.component.html',
	styleUrls: ['./responsive-iframe.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResponsiveIframeComponent implements OnInit {
	@Input() src: string
	constructor(
		private sanitizer: DomSanitizer
	) { }

	ngOnInit() {
	}
	getEmbedUrl(){
		return this.sanitizer.bypassSecurityTrustResourceUrl(this.src);
	}
}
