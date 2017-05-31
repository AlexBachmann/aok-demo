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
import { ShowcaseRoutingModule } from './routing.module';
import { ShowcaseComponent } from './showcase.component';
import { HomeComponent } from './home/home.component';
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

@NgModule({
  imports: [
    CommonModule,
    NativeScriptModule,
    ShowcaseRoutingModule
  ],
  declarations: [
  	ShowcaseComponent,
  	HomeComponent
  ]
})
export class ShowcaseModule { }