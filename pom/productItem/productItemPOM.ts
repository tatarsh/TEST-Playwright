import { Locator, Page } from '@playwright/test';
import { BasePage } from '../basePage';
import { ProductItemLocators } from '../productItem/productItemLocators';

export class ProductItem extends BasePage {
  readonly name: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;

  constructor(page: Page) {
    super(page);
    this.name = page.locator(ProductItemLocators.productName);
    this.price = page.locator(ProductItemLocators.productPrice);
    this.addToCartButton = page.locator(ProductItemLocators.addToCartButton);
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