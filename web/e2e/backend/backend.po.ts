/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { browser, element, by } from 'protractor';
import { LoginPage } from './login/login.po';

export class BackendPage {
	navigateTo() {
		return browser.get('/backend');
	}
	login(){
		var loginPage = new LoginPage();
		loginPage.navigateTo();
		loginPage.login();
	}
	logout(){
		var value = browser.executeScript("return window.localStorage.removeItem('tekkl-user');");
	}
}