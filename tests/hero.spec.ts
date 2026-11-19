import { test, expect } from '@playwright/test';

const products = ['Akubela HyPanel KeyPlus', 'Akubela HyPanel Supreme', 'Akubela Aura Series Smart Switch', 'Akubela SL60 Smart Lock', 'Akubela SL30 Smart Lock'];
for (const width of [1440, 1024, 768, 390, 360]) {
  test(`luxury hero frames all five products at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Technology meets');
    await expect(page.locator('.s-hero-bottom')).toHaveCount(0);
    await page.locator('.s-hero .s-action').focus();
    for (let index = 0; index < products.length; index++) {
      if (index > 0) await page.keyboard.press('ArrowRight');
      const image = page.locator('.s-hero-image');
      await expect(image).toHaveAttribute('alt', products[index]);
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
      await expect(page.locator('.s-hero-model')).toHaveText(products[index]);
      await expect(page.locator('.s-hero .s-action')).toHaveAttribute('href', '/products');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
      if (width <= 600) {
        const photo = await image.boundingBox();
        const text = await page.locator('.s-hero-copy').boundingBox();
        expect(photo!.y + photo!.height).toBeLessThan(text!.y);
      }
      await page.locator('.s-hero').screenshot({ path: testInfo.outputPath(`slide-${index + 1}.png`), animations: 'disabled' });
    }
    await expect(page.getByRole('button', { name: 'Pause carousel' })).toHaveCount(0);
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.s-hero-model')).toHaveText(products[0]);
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('.s-hero-model')).toHaveText(products[4]);
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.s-hero-model')).toHaveText(products[0]);
  });
}
