import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoComponent } from './video.component';
import { VideoService } from './video.service';
import { FavoriteService } from './favorite.service';
import { ResponsiveIframeComponent } from './responsive-iframe.component';
import { EllipsisDirective } from '../directives/ellipsis';
import { HistoryService } from './history.service';

@NgModule({
	imports: [
		CommonModule
	],
	providers: [ VideoService, FavoriteService, HistoryService ],
	declarations: [ VideoComponent, ResponsiveIframeComponent, EllipsisDirective ],
	exports: [ VideoComponent, ResponsiveIframeComponent ]
})
export class VideoModule { }
