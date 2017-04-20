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
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './shared/header/header.component';
import { BackendComponent } from './backend.component';
import { BackendRoutingModule } from './routing.module';
import { UiModule } from '../shared/ui/ui.module';
import { FormsModule } from '../shared/forms/forms.module';
import { MenuComponent } from './shared/menu/menu.component';
import { FacebookModule } from '../shared/facebook/facebook.module';

@NgModule({
  imports: [
    CommonModule,
    BackendRoutingModule,
    UiModule,
    FormsModule,
    FacebookModule,
  ],
  declarations: [
  	LoginComponent, 
  	HeaderComponent, 
  	BackendComponent, 
    MenuComponent
  ]
})
export class BackendModule { }
