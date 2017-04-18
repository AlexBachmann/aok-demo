/**
 * This file is part of the TEKKL core package
 *
 * (c) Alexander Bachmann <email.bachmann@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
import { DashboardPage } from './dashboard.po';
import { browser, element, by, protractor } from 'protractor';

describe('Backend Dashboard Page', function() {
	let page: DashboardPage;

	// Before we start, let's login
	page = new DashboardPage();
	page.login();

	beforeEach(() => {
		page = new DashboardPage();
		page.navigateTo();
	});

	it('should navigate to the Dashboard Page', () => {
		expect(browser.getCurrentUrl()).toMatch(/\/backend$/);
	});
});