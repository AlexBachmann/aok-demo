/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './home.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { HistoryComponent } from './history/history.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
	{ path: 'video/:id', component: VideoDetailComponent },
	{ path: 'verlauf', component: HistoryComponent },
	{ path: 'favoriten', component: FavoritesComponent },
	{ path: 'einstellungen', component: SettingsComponent },
	{ path: '', component: HomeComponent }
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [
		RouterModule
	]
})
export class HomeRoutingModule {}