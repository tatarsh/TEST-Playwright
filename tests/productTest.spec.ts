import { test } from '@playwright/test';
import { HomePage } from '../pom/homePage/homePagePOM';
import { SearchResults } from '../pom/searchResults/searchResultsPOM';
import { ProductItem } from '../pom/productItem/productItemPOM';

test('Search and interact with product item', async ({ page }) => {
  await page.goto('https://sas.am');

  const home = new HomePage(page);
  await home.doSearch('ararat');

  const searchRes = new SearchResults(page);
  await searchRes.printNthProductName(0);
  await searchRes.clickOnNthProduct(0);

  const productItem = new ProductItem(page);
  
  await productItem.printTitle();
  await productItem.printPrice();
  await productItem.addToCart();
  
});
