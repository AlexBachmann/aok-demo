import { Component, OnInit } from '@angular/core';
import { VideoService, Video } from '../../../shared/video/video.service';
import { FavoriteService } from '../../../shared/video/favorite.service';
import { HistoryService, HistoryItem } from '../../../shared/video/history.service';

@Component({
	selector: 'tekkl-history',
	templateUrl: './history.component.html',
	styleUrls: ['./history.component.sass']
})
export class HistoryComponent implements OnInit {
	history: HistoryItem[]
	constructor(
		private historySerive: HistoryService
	) { }

	ngOnInit() {
		this.history = this.historySerive.getHistory();
	}

}
