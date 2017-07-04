import { Injectable } from '@angular/core';
import { Video } from './video.service';
import { TimeHelper } from '../../lib/utils/time-helper';

export interface HistoryItem {
	video: Video,
	date: string
}

Injectable()
export class HistoryService {
	videos: HistoryItem[]
	constructor(){
		this.load();
	}
	store(){
		var key = this.getKey();
		localStorage.getItem(key);
		localStorage.setItem(key, JSON.stringify(this.videos));
	}
	load(){
		var key = this.getKey();
		this.videos = [];
		var data = localStorage.getItem(key);
		if(data){
			this.videos = JSON.parse(data);
		}
	}
	getKey():string {
		return 'aok_history_store';
	}
	getHistory(): HistoryItem[]{
		return this.videos.sort((entry1, entry2) => {
			return (entry2.date < entry1.date) ? -1 : 1;
		});
	}
	watch(video: Video){
		var date = TimeHelper.getMySQLDateTime();
		this.set(video, date);
	}
	set(video: Video, date: string){
		var results = this.videos.filter((entry) => entry.video.id == video.id);
		if(results.length){
			results[0].date = date;
		}else{
			this.videos.push({video: video, date: date});
		}
		this.store();
	}
}