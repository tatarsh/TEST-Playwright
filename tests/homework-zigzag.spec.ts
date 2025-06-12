import { test, expect } from '@playwright/test';

test('Zigzag.am - Add products and verify cart and checkout', async ({ page }) => {
  await page.goto('https://www.zigzag.am/');
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
  const firstProductPrice = await firstProduct.locator('.price').innerText();


  // Step 5: Add to cart
  await firstProduct.hover();
  const addToCartButton = firstProduct.locator('button:has-text("Ավելացնել")');
  await expect(addToCartButton).toBeVisible();
  await addToCartButton.click();


  // Step 6: Verify added to cart
  await page.locator('.basket_block .mpquickcart-icon-wrapper').click();
  await expect(page.locator('.product-item-name')).toContainText(firstProductName);

  // Step 7: Soft assert product name and price
  const cartItem = page.locator('.minicart-items').first();
  await expect(cartItem).toContainText(firstProductName);
  await expect(cartItem).toContainText(firstProductPrice);

  // Step 8: Choose another Recommended tab
  const recommendedTab2 = page.getByRole('link', { name: 'Կենցաղային տեխնիկա' });
  await expect(recommendedTab2).toBeVisible();
  await recommendedTab2.first().click();
  await expect(page.locator('.product_block .block_inner').last()).toBeVisible();

  // Step 9–10: Select second product
  const secondProduct = page.locator('.product_block .block_inner').nth(2);
  const secondProductName = await secondProduct.locator('.product-title').innerText();
  const secondProductPrice = await secondProduct.locator('.price').innerText();

  // Step 11: Add second product
  const secondAddButton = secondProduct.locator('button:has-text("Ավելացնել")');
  await expect(secondAddButton).toBeEnabled();
  await secondAddButton.click();

  // Step 12: Verify both items in cart (soft)
//   await cartIcon.hover();
  const cartItems = page.locator('.cart-dropdown .cart-item');
  await expect(cartItems).toHaveCount(2);
  await expect(cartItems.nth(0)).toContainText(firstProductName);
  await expect(cartItems.nth(1)).toContainText(secondProductName);

  const totalPriceText = await page.locator('.cart-dropdown .total-price').innerText();
  const totalExpected = parseFloat(firstProductPrice) + parseFloat(secondProductPrice);
  expect(parseFloat(totalPriceText)).toBeCloseTo(totalExpected);

  // Step 13: Click "Զամբյուղ"
//   await cartIcon.click();
  await expect(page).toHaveURL(/cart/);
  await expect(page.locator('.cart-page')).toBeVisible();

  // Step 14: Check product names and prices
  const cartPageItems = page.locator('.cart-item-row');
  await expect(cartPageItems.nth(0)).toContainText(firstProductName);
  await expect(cartPageItems.nth(1)).toContainText(secondProductName);

  const summaryTotal = await page.locator('.order-total .amount').innerText();
  expect(parseFloat(summaryTotal)).toBeCloseTo(totalExpected);

  // Step 15: Click "Շարունակել գնումը"
  const continueBtn = page.locator('text=Շարունակել գնումը');
  await expect(continueBtn).toBeEnabled();
  await continueBtn.click();

  // Step 16: Fill delivery address
  await expect(page.locator('#checkout-form')).toBeVisible();
  await page.fill('input[name="firstName"]', 'John');
  await page.fill('input[name="lastName"]', 'Doe');
  await page.fill('input[name="address"]', 'Baghramyan 1, Yerevan');
  await page.fill('input[name="city"]', 'Yerevan');
  await page.fill('input[name="phone"]', '098765432');

  // Step 17: Verify order summary
  const orderSummary = page.locator('.order-summary');
  await expect(orderSummary).toContainText(firstProductName);
  await expect(orderSummary).toContainText(secondProductName);
  await expect(orderSummary.locator('.order-total')).toContainText(summaryTotal);

  // Bonus: Use remaining assertions (if applicable)
//   await expect(cartIcon).toBeAttached();
//   await expect(cartIcon).toBeInViewport();
//   await expect(cartIcon).toBeEnabled();
//   await expect(cartIcon).toHaveClass(/cart-icon/);
  await expect(page.locator('.logo')).toHaveAttribute('href', '/');
  await expect(page.locator('h1')).toHaveText(/Զամբյուղ|Cart/);
});
