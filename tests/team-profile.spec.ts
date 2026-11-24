import { test, expect } from '@playwright/test';

test('team cards open the correct standalone profile', async ({ page }) => {
  await page.goto('/about');
  await page.getByRole('link', { name: "View Karthik Radhakrishnan's profile" }).click();
  await expect(page).toHaveURL(/\/team\/karthik$/);
  await expect(page.getByRole('heading', { name: 'Karthik Radhakrishnan' })).toBeVisible();
  await expect(page.getByText('karthik@example.com')).toBeVisible();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.getByRole('link', { name: 'Back to our team' }).click();
  await expect(page).toHaveURL(/\/about#our-team$/);
});

test('direct profile and earlier shared link work on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/about?team=vinay');
  await expect(page).toHaveURL(/\/team\/vinay$/);
  await expect(page.getByRole('heading', { name: 'Vinay A P' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Vinay A P' })).toBeVisible();
});
