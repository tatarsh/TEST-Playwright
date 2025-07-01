import { test, expect } from '@playwright/test';

// test.beforeEach(async ({ page }) => {
//   await page.goto('https://zangakbookstore.am/');
// });

// test('searches for the book "Նորվեգական անտառ"', async ({ page }) => {
//   const desiredBook = 'Նորվեգական անտառ';

//   // Locate the search input field by placeholder or other method
//   const searchInput = await page.locator('input[placeholder="Որոնել ..."]');
//   await searchInput.fill(desiredBook);
//   await searchInput.press('Enter');

//   // Wait for search results to load (adjust as needed)
//   await page.waitForLoadState('networkidle');

//   // Assert that the book appears in the results
//   await expect(page.getByText(desiredBook)).toBeVisible();
// });

// test('Search and check product name and price on Zigzag.am', async ({ page }) => {

//   await page.goto('https://www.zigzag.am/');

//   const searchBox = page.locator('#search');
//   await searchBox.fill('Indesit TIA 16 S');
//   await searchBox.press('Enter');

//   const productCard = page
//     .locator('.product_name', { hasText: 'Indesit TIA 16 S' })
//     .first();

//   const productName = await productCard.textContent();
//   const productItem = page.locator('li', { hasText: 'Indesit TIA 16 S' }).first();
//   const price = productItem.locator('.price').first();
//   await expect(price).toBeVisible();


//   console.log('Product Name:', productName);
//   const priceText = await price.textContent();
//   console.log('Price:', priceText);

 
//   expect(productName).toMatch(/Indesit TIA 16 S/);
//   expect(priceText).toMatch(/\d{1,3}(,\d{3})*(\.\d+)?\s+֏/);
// });


test('Search and check locators', async ({ page }) => {
  //  await page.goto('https://www.sas.am/');
  //  const searchBox = page.locator('.search__input');
  //  const searchBtn = page.locator('.search__btn');
  //  await searchBox.fill('ararat');
  //  await searchBtn.click();
  
})
