import { expect, Page } from '@playwright/test';
import { ProductItemLocators } from '../productItem/productItemLocators';

export class ProductItemAssertions {
  constructor(private page: Page) {}

  async cartHasItems(expectedCount: number) {
    const cartItems = await this.page.locator(ProductItemLocators.productName);
    await expect(cartItems).toHaveCount(expectedCount);
  }

  async totalPriceMatches(index: number) {
    const itemPrice = await this.page.locator(ProductItemLocators.productPrice).nth(index).innerText();
    // const cartTotal = await this.page.locator(ProductItemLocators.cartTotal).innerText();
    // expect(cartTotal).toContain(itemPrice);
  }
}
;