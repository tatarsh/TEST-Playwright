import { expect } from '@playwright/test';
import { HomePage } from '../homePage/homePagePOM';

export class HomeAssertions {
  readonly homePage: HomePage;

  constructor(homePage: HomePage) {
    this.homePage = homePage;
  }

  async expectLogoVisible() {
    await expect(this.homePage.logo).toBeVisible();
  }

  async expectNavItemsExist() {
    const count = await this.homePage.navMenu.locator('li').count();
    await expect(count).toBeGreaterThan(0);
  }

  // async expectProductCount(minCount = 1) {
  //   const count = await this.homePage.products.count();
  //   await expect(count).toBeGreaterThanOrEqual(minCount);
  // }
}
