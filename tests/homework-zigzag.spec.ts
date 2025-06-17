import { test, expect } from '@playwright/test';

test('Zigzag.am - Add products and verify cart and checkout', async ({ page }) => {
  await page.goto('https://www.zigzag.am/');
  // just for the use
  await expect(page).toHaveURL(/zigzag\.am/);
  await expect(page).toHaveTitle(/Zigzag|Զիգզագ/);

  // Step 2: Navigate to "Ըստ ցանկության" (Recommended) tab
  const recommendedTab = page.getByRole('link', { name: 'Խոհանոցային տեխնիկա' });
  await expect(recommendedTab).toBeVisible();
  await recommendedTab.first().click();
  await expect(page.locator('.product_block .block_inner').first()).toBeVisible();


  // Step 3: Select the first product
  const firstProduct = page.locator('.product_block .block_inner').first();
  const firstProductName = await firstProduct.locator('.product_name').innerText();
  const firstProductPrice = await firstProduct.locator('.product_price .current_price').innerText();


  // Step 5: Add to cart
  await firstProduct.hover();
  const addToCartButton = firstProduct.locator('button:has-text("Ավելացնել")');
  await expect(addToCartButton).toBeVisible();
  await addToCartButton.click();


  // Step 6: Soft assert product name and price
  await page.waitForTimeout(5000);
  const cartItem = page.locator('.minicart-items').first();
  await expect(cartItem).toContainText(firstProductName);
  await expect(cartItem).toContainText(firstProductPrice);

  // Step 7: Choose another Recommended tab
  await page.locator('.modals-overlay').click();
  const recommendedTab2 = page.getByRole('link', { name: 'Կենցաղային տեխնիկա' });
  await expect(recommendedTab2).toBeVisible();
  await recommendedTab2.first().click();
  await expect(page.locator('.product_block .block_inner').first()).toBeVisible();

  // Step 8–10: Select second product
  const secondProduct = page.locator('.product_block .block_inner').first();
  const secondProductName = await secondProduct.locator('.product_name').innerText();
  const secondProductPrice = await secondProduct.locator('.product_price .current_price').innerText();

  // Step 11: Add second product
  await firstProduct.hover();
  const secondAddButton = secondProduct.locator('button:has-text("Ավելացնել")');
  await expect(secondAddButton).toBeVisible();
  await addToCartButton.click();

  // Step 12: Verify both items in cart (soft)
  const cartItems = page.locator('#mini-cart .product-item');
  console.log('Cart Items count:' + cartItems.count);
  await expect.soft(cartItems).toHaveCount(2);
  await expect(cartItems.nth(1).locator('.product-item-name a')).toContainText(firstProductName);
  await expect(cartItems.nth(0).locator('.product-item-name a')).toContainText(secondProductName);

  const totalPriceText = await page.locator('.cart-totals .price').last().innerText();
  const totalExpected = parseFloat(firstProductPrice) + parseFloat(secondProductPrice);
  expect(parseFloat(totalPriceText)).toBeCloseTo(totalExpected);

  // Step 13: Click "Պատվիրել"
  const continueBtn = page.locator('text=Պատվիրել');
  await expect(continueBtn).toBeEnabled();
  await continueBtn.click();

  // Step 14: Fill delivery address
  await expect(page.locator('#checkout')).toBeVisible();
  await page.waitForTimeout(5000);
  const email = page.locator('#customer-email').first();
  await email.fill('tatev@zemaenterprises.com');
  const firstName = page.locator('#shipping-new-address-form input[name="firstname"]');
  await firstName.fill('Tatev');
  const lastName = page.locator('#shipping-new-address-form input[name="lastname"]').first();
  await lastName.fill('Yan');
  const region = page.locator('.filter-option-inner').nth(2);
  await region.click();
  await page.locator('.dropdown-menu li', { hasText: 'Երևան' }).click();
  const requiredInputs = page.locator('#shipping-new-address-form input[required]');
  const address = requiredInputs.nth(5);
  await address.fill('Komitas');
  const tel = page.locator('#telephone_fake').first();
  await tel.fill('000888999');

  // Step 15: Checkout
  await page.locator('.checkout_submit').first().click();

});
