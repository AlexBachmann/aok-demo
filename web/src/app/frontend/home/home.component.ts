/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PageComponent } from '../../shared/browser/page/page.component';
import { NotificationService } from '../../shared/ui/notification/notification.service';
import { VideoService, Video } from '../../shared/video/video.service';

@Component({
	selector: 'tekkl-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass']
})
export class HomeComponent extends PageComponent implements OnInit {
	recos: Video[]
	enabled: Video[]
	showIntro: boolean = true
	selectedCategories: string[] = []
	categories: string[]
	constructor(
		public videoService: VideoService,
		title: Title,
		notificationService: NotificationService
	){
		super(title, notificationService);
	}

	ngOnInit() {
		this.setPageTitle();
		this.recos = this.videoService.getRecommendations(4);
		this.enabled = this.videoService.getEnabled();
		this.categories = this.videoService.getCategories().sort();
	}

	toggleIntro(){
		this.showIntro = !this.showIntro;
	}
	toggleCategory(category: string){
		if(this.selectedCategories.indexOf(category) >= 0){
			this.selectedCategories.splice(this.selectedCategories.indexOf(category), 1);
		}else{
			this.selectedCategories.push(category);
		}
	}
	isSelectedCategory(category: string){
		return this.selectedCategories.indexOf(category) >= 0;
	}
	getVideosByCategories(){
		return this.videoService.getByCategories(this.selectedCategories);
	}
}
