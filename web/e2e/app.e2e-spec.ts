import { HomePage } from './app.po';
import { browser, element, by } from 'protractor';

describe('Home Page', function() {
  let page: HomePage;

  beforeEach(() => {
    page = new HomePage();
  });

  it('should navigate to the homepage', () => {
    page.navigateTo();
    expect(browser.getCurrentUrl()).toMatch(/\/$/);
  });
});
