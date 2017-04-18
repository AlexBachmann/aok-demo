/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { RegisterPage } from './register.po';
import { browser, element, by, protractor } from 'protractor';

describe('RegisterPage', function() {
  let page: RegisterPage;

  beforeEach(() => {
    page = new RegisterPage();
    page.navigateTo();
  });

  it('should navigate to the Login Page', () => {
    expect(browser.getCurrentUrl()).toMatch(/\/user\/register/);
  });
  it('should contain the username input field', () => {
  	expect(page.getUserNameInput().isPresent()).toBeTruthy();
  });
  it('should contain the email input field', () => {
  	expect(page.getEmailInput().isPresent()).toBeTruthy();
  });
  it('should contain the password input field', () => {
  	expect(page.getPasswordInput().isPresent()).toBeTruthy();
  });
  it('should contain the password verify input field', () => {
  	expect(page.getPasswordVerifyInput().isPresent()).toBeTruthy();
  });
  it('should contain the submit button', () => {
  	expect(page.getSubmitButton().isPresent()).toBeTruthy();
  });
  it('should disable the submit button as long as a single field is empty', () => {
  	var username = page.getUserNameInput();
  	var email = page.getEmailInput();
  	var password = page.getPasswordInput();
  	var password_verify = page.getPasswordVerifyInput();
  	var submit = page.getSubmitButton();
  	expect(username.getAttribute('value')).toMatch('');
  	expect(email.getAttribute('value')).toMatch('');
  	expect(password.getAttribute('value')).toMatch('');
  	expect(password_verify.getAttribute('value')).toMatch('');
  	expect(submit.isEnabled()).toBeFalsy();

  	username.sendKeys('admin');
  	expect(submit.isEnabled()).toBeFalsy();

  	email.sendKeys('admin@test.de');
  	expect(submit.isEnabled()).toBeFalsy();

  	password.sendKeys('password');
  	expect(submit.isEnabled()).toBeFalsy();

  	password_verify.sendKeys('password');
  	expect(submit.isEnabled()).toBeTruthy();
  });
  it('should be able to register', () => {
  	var username = page.getUserNameInput();
  	var email = page.getEmailInput();
  	var password = page.getPasswordInput();
  	var password_verify = page.getPasswordVerifyInput();
  	var submit = page.getSubmitButton();

  	var usernameInput = 'user' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
  	var emailInput = 'email' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5) + '@test.de';


  	username.sendKeys(usernameInput);
  	email.sendKeys(emailInput);
  	password.sendKeys('password');
  	password_verify.sendKeys('password');
  	expect(submit.isEnabled()).toBeTruthy();
  	submit.click();
  	browser.waitForAngular();
  	
  	expect(browser.getCurrentUrl()).toMatch(/\/$/);
  	browser.manage().getCookie("BEARER").then(function(data){
        expect(data && data.value).toBeTruthy();
    });
  });
});