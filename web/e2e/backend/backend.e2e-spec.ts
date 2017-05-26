/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { BackendPage } from './backend.po';
import { browser, element, by, protractor } from 'protractor';

describe('Backend', function() {
	let page: BackendPage;

	beforeEach(() => {
		page = new BackendPage();
		page.logout();
	});

	it('should renavigate unauthorized users to the login page', () => {
		page.navigateTo();
		expect(browser.getCurrentUrl()).toMatch(/\/backend\/login$/);
	});
	it('should navigate to the backend after successfuly login', ()=> {
		page.login();
		page.navigateTo();
		expect(browser.getCurrentUrl()).toMatch(/\/backend$/);
	});
});