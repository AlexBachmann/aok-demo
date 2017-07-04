import { Component, OnInit } from '@angular/core';
import { VideoService, Video } from '../../../shared/video/video.service';
import { FavoriteService, Favorite } from '../../../shared/video/favorite.service';
import { HistoryService } from '../../../shared/video/history.service';

@Component({
	selector: 'tekkl-favorites',
	templateUrl: './favorites.component.html',
	styleUrls: ['./favorites.component.sass']
})
export class FavoritesComponent implements OnInit {
	favorites: Favorite[]
	constructor(
		private favService: FavoriteService
	) { }

	ngOnInit() {
		this.favorites = this.favService.getFavorites();
	}

}
