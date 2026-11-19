import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import type data from '../src/site/akubela/manifest.json';
const manifest: typeof data = JSON.parse(readFileSync('src/site/akubela/manifest.json', 'utf8'));

const base = '/products/automation/akubela';
test('verified catalogue: 10 categories, 79 unique products, assets and detail routes', async ({ page }) => {
  test.setTimeout(180000);
  expect(manifest.categories.map(c => c.count)).toEqual([11,12,7,9,6,17,4,3,6,4]);
  expect(new Set(manifest.products.map(p => p.slug)).size).toBe(79);
  expect(new Set(manifest.products.map(p => p.image)).size).toBe(79);
  for (const item of manifest.products) {
    expect((await page.request.get(item.image)).ok()).toBeTruthy();
    await page.goto(`${base}/products/${item.slug}`);
    await expect(page.locator('h1')).toHaveText(item.name);
    await expect(page).toHaveTitle(new RegExp('Siddheshwar'));
    await expect(page.getByRole('link', { name: 'Enquire About This Product', exact: true })).toHaveAttribute('href', `/contact?interest=${encodeURIComponent(item.name)}`);
    await expect(page.locator('.ak-detail-image img')).toHaveJSProperty('naturalWidth', item.width);
  }
});
for (const width of [1440, 768, 390]) {
  test(`categories, filters, search and layout at ${width}px`, async ({ page }) => {
    test.setTimeout(120000);
    await page.setViewportSize({ width, height: 900 });
    for (const path of [base, `${base}/categories`, `${base}/products`]) {
      await page.goto(path);
      await expect(page.locator('h1')).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    }
    await page.getByRole('searchbox').fill('Supreme');
    await expect(page.locator('.ak-product')).toHaveCount(1);
    await page.getByRole('searchbox').fill('not a model');
    await expect(page.locator('.ak-empty')).toBeVisible();
    await page.getByRole('button', {name:'Clear search'}).click();
    await expect(page.locator('.ak-product')).toHaveCount(79);
    for (const category of manifest.categories) {
      await page.getByRole('combobox', {name:'Akubela category'}).selectOption(category.slug);
      await expect(page.locator('h1')).toHaveText(category.name);
      await expect(page.locator('.ak-product')).toHaveCount(category.count);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    }
    await page.getByRole('combobox', {name:'Sort',exact:true}).selectOption('az');
    await expect(page.locator('.ak-product h3').first()).toHaveText('Akubela Cloud');
    await page.locator('.ak-product').first().click();
    await expect(page.getByRole('heading', {name:'Platform Information'})).toBeVisible();
    await page.getByRole('link', {name:'Enquire About This Product',exact:true}).click();
    await expect(page.locator('.s-form-interest')).toContainText('Akubela Cloud');
  });
}

test('Akubela is discoverable from responsive navigation', async ({ page }) => {
  await page.setViewportSize({width:390,height:844});
  await page.goto('/');
  await page.getByRole('button',{name:'Open navigation'}).click();
  const nav = page.getByRole('navigation',{name:'Main navigation',exact:true});
  await nav.getByRole('button', { name: /Products menu/ }).click();
  await nav.locator('summary').click();
  await nav.getByRole('link',{name:'All Akubela Products',exact:true}).click();
  await expect(page.locator('h1')).toHaveText('All Akubela Products');
});
