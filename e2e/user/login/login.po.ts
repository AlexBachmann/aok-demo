/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { browser, element, by } from 'protractor';

export class LoginPage {
  navigateTo() {
    return browser.get('/user/login');
  }
  getUserNameInput(){
    return element(by.css('app-login input[ng-reflect-name="_username"]'));
  }
  getPasswordInput(){
    return element(by.css('app-login input[ng-reflect-name="_password"]'));
  }
  getSubmitButton(){
  	return element(by.css('app-login button[type="submit"]'));
  }
}
