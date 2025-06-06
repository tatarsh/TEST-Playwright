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

test('Search and check product name and price on Zigzag.am', async ({ page }) => {
  // Step 1: go to homepage
  await page.goto('https://www.zigzag.am/');

  // Step 2: search
  const searchBox = page.locator('input[placeholder*="Մուտքագրեք"]');
  await searchBox.fill('Indesit TIA 16 S');
  await searchBox.press('Enter');

  // Step 3: wait for results
  await page.waitForTimeout(3000);

  // Step 4: find the product card uniquely
  const productCard = page
    .locator('.product_name', { hasText: 'Indesit TIA 16 S' })
    .first();
  await expect(productCard).toBeVisible();

  // Step 5: extract name and price
  const productName = await productCard.textContent();
  const productItem = page.locator('li', { hasText: 'Indesit TIA 16 S' });
  const price = productItem.locator('text=140,300 ֏');
  await expect(price).toBeVisible();


  console.log('Product Name:', productName);
  const priceText = await price.textContent();
  console.log('Price:', priceText);

  // Assertions
  expect(productName).toMatch(/Indesit TIA 16 S/);
  expect(priceText).toMatch(/\d{1,3}(,\d{3})*(\.\d+)?\s+֏/);
});
