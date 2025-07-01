import { test } from '@playwright/test';
import { homePage4U } from '../pom/homePage4U/homePage4UPOM';
import { SearchResults } from '../pom/searchResults4U/searchResults4UPOM';
import { ProductItem } from '../pom/productItem/productItemPOM';

test('Search and interact with product item', async ({ page }) => {
  await page.goto('https://sas.am');

  const home = new homePage4U(page);
  await home.doSearch('Ararat');

  const searchRes = new SearchResults(page);
  await searchRes.printNthProductName(0);
  await searchRes.clickOnNthProduct(0);

  const productItem = new ProductItem(page, '.product');
  await productItem.printTitle();
  await productItem.printPrice();
  await productItem.addToCart();
});