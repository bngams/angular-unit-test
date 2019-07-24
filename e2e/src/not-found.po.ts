import { browser, by, element } from 'protractor';

export class NotFound {
  navigateTo() {
    return browser.get('/unknownURL');
  }

  getNotFoundText() {
    return element(by.css('h1')).getText();
  }
}
