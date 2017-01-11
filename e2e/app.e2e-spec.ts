import { EddbV4Page } from './app.po';

describe('eddb-v4 App', function() {
  let page: EddbV4Page;

  beforeEach(() => {
    page = new EddbV4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
