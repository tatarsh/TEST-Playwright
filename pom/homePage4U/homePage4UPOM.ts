import { Locator, Page } from '@playwright/test';
import { BasePage } from '../basePage';
import { HomePageLocators } from './homePage4ULocators';

export class homePage4U extends BasePage {
  readonly searchField: Locator;
  readonly searchIcon: Locator;
  readonly logo: Locator;
  readonly languageSwitcher: Locator;
  readonly navMenu: Locator;
  readonly cartIcon: Locator;
  readonly bannerSlider: Locator;

  constructor(page: Page) {
    super(page);
    this.searchField = page.locator(HomePageLocators.searchField);
    this.searchIcon = page.locator(HomePageLocators.searchIcon);
    this.logo = page.locator(HomePageLocators.logo);
    this.languageSwitcher = page.locator(HomePageLocators.languageSwitcher);
    this.navMenu = page.locator(HomePageLocators.navMenu);
    this.cartIcon = page.locator(HomePageLocators.cartIcon);
    this.bannerSlider = page.locator(HomePageLocators.bannerSlider);
  }

  async doSearch(searchKey: string) {
    await this.searchField.fill(searchKey);
    await this.searchIcon.click();
  }

  async clickLogo() {
    await this.logo.click();
  }

  async changeLanguage() {
    await this.languageSwitcher.click();
  }

  async openNavMenu() {
    await this.navMenu.first().click();
  }

  async goToCart() {
    await this.cartIcon.click();
  }

  async isBannerVisible() {
    await this.assertVisible(this.bannerSlider);
  }
}