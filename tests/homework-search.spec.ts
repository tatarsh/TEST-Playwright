import { test, expect } from '@playwright/test';
// Test Search Functionality on zigzag.am

test('Search functionality returns relevant results', async ({ page }) => {
  // 1. Go to homepage
  await page.goto('https://www.zigzag.am/');

  // 2. Locate the search input
  const searchInput = page.locator('#search'); // adjust if needed

  // 3. Type the keyword
  const keyword = 'iphone';
  await searchInput.fill(keyword);

  // 4. Press Enter
  await searchInput.press('Enter');

  // 5. Wait for results
  const productCards = page.locator('.product_block .block_inner'); // adjust selector if needed
  await expect(productCards.first()).toBeVisible();

  // 6. Check product titles contain the keyword (soft assertion-style)
  const productTitles = await page.locator('.product-item .product-title').allTextContents();
  for (const title of productTitles) {
    expect(title.toLowerCase()).toContain(keyword.toLowerCase());
  }
});


// Negative Search
// Verify that an invalid keyword shows no results or "Արդյունք չի գտնվել" message.

test('Search returns no products for a nonsense keyword', async ({ page }) => {
  await page.goto('https://www.zigzag.am/');
  await page.locator('#search').fill('asdkjfhwuewr');
  await page.keyboard.press('Enter');
  const noResult = page.locator('.message.notice'); 
  await expect(noResult).toBeVisible();
});


// Case Insensitivity Check
// Ensure that search is case-insensitive (e.g., IPHONE vs iphone).

test('Search is case-insensitive', async ({ page }) => {
  await page.goto('https://www.zigzag.am/');
  const keyword = 'IPHONE';
  await page.locator('#search').fill(keyword);
  await page.keyboard.press('Enter');
  const productItems = page.locator('.product_block .block_inner');
  await expect(productItems.first()).toBeVisible();
});


// Test Case: Auto-suggestions Appear While Typing
// Verify that typing in the search input triggers a dropdown or list of product suggestions
// Expected Result:
// A list of suggested product should appear under the search input.

test('Search input displays auto-suggestions while typing', async ({ page }) => {
  // Step 1: Go to the homepage
  await page.goto('https://www.zigzag.am/');

  // Step 2: Locate and type into the search input
  const searchInput = page.locator('#search');
  await searchInput.click();
  await searchInput.type('iphone', { delay: 150 });

  // Step 3: Wait for auto-suggestions to appear
  const suggestionList = page.locator('.autocomplete-list, .suggestions, ul[role="listbox"]');
  await expect(suggestionList).toBeVisible();

  // Step 4: Optional - Validate at least one suggestion appears
  const suggestions = suggestionList.locator('li');
  await expect(suggestions.first()).toBeVisible();
});