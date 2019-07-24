import { NotFound } from './not-found.po';

describe('Test Public Navigation', () => {
  let page: NotFound;

  beforeEach(() => {
    page = new NotFound();
  });

  it('should display not found message', () => {
    page.navigateTo();
    expect(page.getNotFoundText()).toEqual('Page non trouvée');
  });
});
