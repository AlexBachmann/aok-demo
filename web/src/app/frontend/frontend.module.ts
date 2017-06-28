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
import { HomeComponent } from './home/home.component';
import { FrontendRoutingModule } from './routing.module';
import { FrontendComponent } from './frontend.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NotificationModule } from '../shared/ui/notification/notification.module';

@NgModule({
  imports: [
    CommonModule,
    FrontendRoutingModule,
    NotificationModule
  ],
  declarations: [
  	FrontendComponent,
  	HeaderComponent,
  	FooterComponent
  ]
})
export class FrontendModule { }
