// 1. Sorting

import { test, expect } from '@playwright/test';

test('Zigzag.am sort by price', async ({ page }) => {
  await page.goto('https://zigzag.am');

  // Fill and submit search
  const searchField = page.locator('#search');
  await searchField.fill('macbook');
  await searchField.press('Enter');

  // 🔄 Wait for results to appear
  const priceLocator = page.locator('span.price');
  await expect(priceLocator.first()).toBeVisible({ timeout: 10000 }); // wait until first price shows

  // Extract prices
  const prices = await priceLocator.allTextContents();
  console.log('Results count: ' + prices.length);

  prices.forEach((price, index) => {
    console.log(`Price ${index + 1}: ${price}`);
  });
});


test('Zigzag.am sort by price - web elements', async ({ page }) => {
    await page.goto('https://zigzag.am');
  
    // Fill and submit search
    const searchField = page.locator('#search');
    await searchField.fill('macbook');
    await searchField.press('Enter');
    const priceLocator = page.locator('span.price');
    await expect(priceLocator.first()).toBeVisible({ timeout: 10000 });
    const count = await priceLocator.count();
    
    for (let i = 0; i < count; i++) {
      const singlePrice = priceLocator.nth(i);
      const text = await singlePrice.textContent();
      console.log(`Price ${i + 1}: ${text}`);
    }
});