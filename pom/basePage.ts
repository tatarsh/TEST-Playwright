import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async type(locator: Locator, value: string) {
    await locator.fill(value);
  }

  async click(locator: Locator) {
    await locator.click();
  }

  async assertVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async wait(seconds: number) {
    await this.page.waitForTimeout(seconds * 1000);
  }
}