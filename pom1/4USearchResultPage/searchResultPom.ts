import { Locator, Page } from "@playwright/test";
import { basePage } from '../basePage';
import { searchResultLocators } from "./searchResultLocators";


export class SearchResult4U extends basePage {
    readonly products: Locator;
    readonly product_name: Locator;


constructor(page: Page){
super(page);
this.products = page.locator(searchResultLocators.products);
this.product_name = page.locator(searchResultLocators.product_name);
}

async clickOnNthProduct(n: number){
    await this.products.nth(n).click();
}
async printNthproductName(n: number){
    let productName = await 
}
}