import { expect } from '@playwright/test';
import { HomePage } from '../homePage/homePagePOM';

export class HomeAssertions {
  readonly homePage: HomePage;

  constructor(homePage: HomePage) {
    this.homePage = homePage;
  }

  async expectLogoVisible() {
    await expect(this.homePage.locators.logo).toBeVisible();
  }

  async expectNavItemsExist() {
    const count = await this.homePage.locators.navMenu.locator('li').count();
    await expect(count).toBeGreaterThan(0);
  }

  async expectProductCount(minCount = 1) {
    const count = await this.homePage.locators.productItems.count();
    await expect(count).toBeGreaterThanOrEqual(minCount);
  }
}
