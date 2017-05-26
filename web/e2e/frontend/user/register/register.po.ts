/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { browser, element, by } from 'protractor';

export class RegisterPage {
  navigateTo() {
    return browser.get('/user/register');
  }
  getUserNameInput(){
    return element(by.css('app-register input[name="username"]'));
  }
  getEmailInput(){
    return element(by.css('app-register input[name="email"]'));
  }
  getPasswordInput(){
    return element(by.css('app-register input[name="first"]'));
  }
  getPasswordVerifyInput(){
    return element(by.css('app-register input[name="second"]'));
  }
  getSubmitButton(){
  	return element(by.css('app-register button[type="submit"]'));
  }
}
