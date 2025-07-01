import { Locator, Page } from '@playwright/test';
import { BasePage } from '../basePage';
import { SearchResultsLocators } from '../searchResults4U/searchResults4ULocators';

export class ProductItem extends BasePage {
  readonly name: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page, productSelector: string) {
    super(page);
    this.name = page.locator(`${productSelector} ${SearchResultsLocators.productName}`);
    this.price = page.locator(`${productSelector} ${SearchResultsLocators.productPrice}`);
    this.addToCartButton = page.locator(`${productSelector} ${SearchResultsLocators.addToCartButton}`);
  }

  async printTitle() {
    const title = await this.name.textContent();
    console.log('Product Title:', title?.trim());
  }

  async printPrice() {
    const priceText = await this.price.textContent();
    console.log('Product Price:', priceText?.trim());
  }

  async addToCart() {
    await this.addToCartButton.click();
  }
}