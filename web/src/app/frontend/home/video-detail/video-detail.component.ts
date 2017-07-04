import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService, Video } from '../../../shared/video/video.service';
import { FavoriteService } from '../../../shared/video/favorite.service';
import { HistoryService } from '../../../shared/video/history.service';

@Component({
	selector: 'tekkl-video-detail',
	templateUrl: './video-detail.component.html',
	styleUrls: ['./video-detail.component.sass']
})
export class VideoDetailComponent implements OnInit {
	video: Video
	constructor(
		private videoService: VideoService,
		private favService: FavoriteService,
		private route: ActivatedRoute,
		private historyService: HistoryService
	) {}

	ngOnInit() {
		var id = this.route.snapshot.params.id;
		this.video = this.videoService.get(id);
		this.historyService.watch(this.video);
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
}
