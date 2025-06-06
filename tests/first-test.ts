import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://www.inmotionhosting.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Best Web Hosting/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://www.inmotionhosting.com/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get Get Started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Web Hosting & Enterprise Server Solutions' })).toBeVisible();
});

test('has text', async ({ page }) => {
  await page.goto('https://www.inmotionhosting.com/');

// Expect a text "to contain" a substring.
  await page.getByText('Enjoy 3 months on us');
});

test('has label', async ({ page }) => {
  await page.goto('https://secure1.inmotionhosting.com/index/login?_gl=1*1vus01b*_gcl_au*MTUwNTc0NDc3OS4xNzQ4NTk3OTU5*_ga*NjY2NjcyMjU3LjE3NDg1OTgzMTY.*_ga_GWN8TGZG03*czE3NDg1OTgzMTUkbzEkZzEkdDE3NDg2MDI0NjckajU4JGwwJGg5NDkyNTI1Mjc.&pk_vid=1bd7ae5e4efff3ad1748602487bcadb3');

  // Expect a title "to contain" a substring.
  await page.getByLabel('password').check();
});

test('fill placeholder', async ({ page }) => {
  await page.goto('https://secure1.inmotionhosting.com/index/login?_gl=1*1vus01b*_gcl_au*MTUwNTc0NDc3OS4xNzQ4NTk3OTU5*_ga*NjY2NjcyMjU3LjE3NDg1OTgzMTY.*_ga_GWN8TGZG03*czE3NDg1OTgzMTUkbzEkZzEkdDE3NDg2MDI0NjckajU4JGwwJGg5NDkyNTI1Mjc.&pk_vid=1bd7ae5e4efff3ad1748602487bcadb3');

  await page.getByPlaceholder('email address').fill('test');
});
