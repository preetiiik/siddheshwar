import { test, expect } from '@playwright/test';

for (const item of [
  { slug: 'moorgen-knx-smart-touch-s10', count: 2 },
  { slug: 'mdt-glass-pushbutton-plus', count: 11 },
]) {
  test(`${item.slug} gallery loads and switches images`, async ({ page }) => {
    await page.goto(`/products/${item.slug}`);
    const gallery = page.getByRole('group', { name: 'Product images' });
    await expect(gallery.getByRole('button')).toHaveCount(item.count);
    const buttons = gallery.getByRole('button');
    for (let i = 0; i < item.count; i++) {
      const image = buttons.nth(i).locator('img');
      await expect(image).toBeVisible();
      await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    }
    await buttons.last().click();
    await expect(buttons.last()).toHaveAttribute('aria-pressed', 'true');
    await expect.poll(() => page.locator('.dp-image img').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  });
}
