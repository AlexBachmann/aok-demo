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
import { HttpModule, Http } from '@angular/http';
import { Config } from '../../configuration.service';
import { AuthHttp, AuthHttpFactory } from './http.service'

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  declarations: [

  ],
  providers: [
  	{ provide: AuthHttp, useFactory:  AuthHttpFactory, deps: [Http, Config] }
  ]
})
export class AuthenticationModule { }
