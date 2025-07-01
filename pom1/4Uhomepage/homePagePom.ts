import { Locator, Page } from "@playwright/test";
import { basePage } from '../basePage';
import { homePageLocators } from "./homePageLocators";


export class homePage4U extends basePage {
    readonly searchInput: Locator;
    readonly searchButton: Locator;


constructor(page: Page){
super(page);
this.searchInput = page.locator(homePageLocators.searchInput);
this.searchButton = page.locator(homePageLocators.searchButton);
}

async doSearch(searchKey: string){
    await this.searchInput.fill(searchKey);
    await this.searchButton.click();
}
}