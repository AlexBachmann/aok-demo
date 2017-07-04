import { Injectable } from '@angular/core';
import { Video } from './video.service';
import { TimeHelper } from '../../lib/utils/time-helper';

export interface Favorite {
	video: Video,
	date: string,
	favorite: boolean
}

Injectable()
export class FavoriteService {
	favorites: Favorite[] = []
	constructor(){
		this.load();
	}
	store(){
		var key = this.getKey();
		localStorage.getItem(key);
		localStorage.setItem(key, JSON.stringify(this.favorites));
	}
	load() {
		var key = this.getKey();
		this.favorites = [];
		var data = localStorage.getItem(key);
		if(data){
			this.favorites = JSON.parse(data);
		}
	}
	getKey():string {
		return 'aok_favorites_store';
	}
	toggleVideo(video: Video){
		var date = TimeHelper.getMySQLDateTime();
		var results = this.favorites.filter((entry) => entry.video.id == video.id);
		if(results.length){
			results[0].date = date;
			results[0].favorite = !results[0].favorite;
		}else{
			this.favorites.push({video: video, date: date, favorite: true});
		}
		this.store();
	}
	isFavorite(video: Video){
		var results = this.favorites.filter((entry) => entry.video.id == video.id);
		if(results.length && results[0].favorite) return true;
		return false;
	}
	getFavorites():Favorite[]{
		return this.favorites.filter((favorite) => favorite.favorite).sort((entry1, entry2) => {
			return (entry2.date < entry1.date) ? -1 : 1;
		});
	}
}