import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FavoriteService } from './favorite.service';
import { Video } from './video.service';

@Component({
	selector: 'tekkl-video',
	templateUrl: './video.component.html',
	styleUrls: ['./video.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class VideoComponent implements OnInit {
	@Input() video: Video
	constructor(
		private favService: FavoriteService,
		private sanitizer: DomSanitizer,
		private router: Router
	) { }

	ngOnInit() {
	}
	getEmbedUrl(){
		var code = this.video.url.match(/https:\/\/www\.youtube\.com\/watch\?v=(.+)/)[1];
		return 'https://www.youtube.com/embed/' + code + '?controls=0&modestbranding=1&rel=0&showinfo=0';
	}
	toggleFavorite($event){
		$event.stopPropagation()
		this.favService.toggleVideo(this.video);
	}
	isFavorite(){
		return this.favService.isFavorite(this.video);
	}
	navigateToVideo(){
		this.router.navigate(['/video/' + this.video.id]);
	}
}
