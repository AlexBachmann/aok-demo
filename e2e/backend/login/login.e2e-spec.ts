/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { LoginPage } from './login.po';
import { browser, element, by, protractor } from 'protractor';

describe('Backend LoginPage', function() {
	let page: LoginPage;

	beforeEach(() => {
		page = new LoginPage();
		page.navigateTo();
	});

	it('should navigate to the Login Page', () => {
		expect(browser.getCurrentUrl()).toMatch(/\/backend\/login$/);
	});
	it('should contain the username input field', () => {
		expect(page.getUserNameInput().isPresent()).toBeTruthy();
	});
	it('should contain the password input field', () => {
		expect(page.getPasswordInput().isPresent()).toBeTruthy();
	});
	it('should contain the submit button', () => {
		expect(page.getSubmitButton().isPresent()).toBeTruthy();
	});
	it('should disable the submit button as long as a single field is empty', () => {
		var username = page.getUserNameInput();
		var password = page.getPasswordInput();
		var submit = page.getSubmitButton();
		expect(username.getAttribute('value')).toMatch('');
		expect(password.getAttribute('value')).toMatch('');
		expect(submit.isEnabled()).toBeFalsy();

		username.sendKeys('admin');
		expect(submit.isEnabled()).toBeFalsy();

		password.sendKeys('password');
		expect(submit.isEnabled()).toBeTruthy();
	});
	it('should deny non-admin users from logging in', ()=> {
		var username = page.getUserNameInput();
		var password = page.getPasswordInput();
		var submit = page.getSubmitButton();
		username.sendKeys('user');
		password.sendKeys('password');
		submit.click();
		browser.waitForAngular();
		// We should still be on the login page
		expect(browser.getCurrentUrl()).toMatch(/\/backend\/login$/);
	});
	it('should allow admin users to login', () => {
		page.login();
		expect(browser.getCurrentUrl()).toMatch(/\/backend$/);
		browser.manage().getCookie("BEARER").then(function(data){
			expect(data && data.value).toBeTruthy();
		});
	});
});