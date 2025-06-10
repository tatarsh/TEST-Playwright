import { test, expect } from '@playwright/test';

test('Add one item to cart and compare price with total', async ({ page }) => {
  // Go to zigzag.am
  await page.goto('https://www.zigzag.am/');

  // Click on the first product from homepage listings
  const firstProduct = page.locator('.slide_block .product_block .block_inner').first();
  await firstProduct.click();

  // Get item price
  const itemPrice = await page.locator('.product_info .price-box .current_price').innerText();


  // "Add to Cart"
  await page.locator('#product-addtocart-button').click();

  // Go to Cart
  await page.locator('.basket_block .mpquickcart-icon-wrapper').click();

  // Get total price from cart
  const totalPrice = await page.locator('.mpquickcart-block .cart-totals .totals:last-child .price').innerText();

  // Compare prices
  expect(totalPrice).toBe(itemPrice); 
});
