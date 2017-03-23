import { TekklPage } from './app.po';

describe('tekkl App', function() {
  let page: TekklPage;

  beforeEach(() => {
    page = new TekklPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
