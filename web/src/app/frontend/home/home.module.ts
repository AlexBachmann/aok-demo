/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './routing.module';
import { HomeComponent } from './home.component';
import { BrowserModule } from '../../shared/browser/browser.module';
import { NotificationModule } from '../../shared/ui/notification/notification.module';
import { VideoModule } from '../../shared/video/video.module';
import { VerticalSlideModule } from '../../shared/ui/vertical-slide/vertical-slide.module';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { HistoryComponent } from './history/history.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SettingsComponent } from './settings/settings.component';
import { FormsModule } from '../../shared/forms/forms.module';

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		NotificationModule,
		VideoModule,
		HomeRoutingModule,
		VerticalSlideModule,
		FormsModule
	],
	declarations: [
		HomeComponent,
		VideoDetailComponent,
		HistoryComponent,
		FavoritesComponent,
		SettingsComponent
	]
})
export class HomeModule { }
