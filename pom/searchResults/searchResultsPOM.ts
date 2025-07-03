import { Locator, Page } from '@playwright/test';
import { BasePage } from '../basePage';
import { SearchResultsLocators } from './searchResultsLocators';

export class SearchResults extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async clickOnNthProduct(n: number) {
    await this.page.locator(SearchResultsLocators.productWrapper).nth(n).click();
  }

  async printNthProductName(n: number) {
    let prodName = await this.page
      .locator(SearchResultsLocators.productWrapper)
      .nth(n)
      .locator(SearchResultsLocators.productName)
      .first()
      .textContent();
    console.log('NAME = ' + prodName?.trim());
  }
}