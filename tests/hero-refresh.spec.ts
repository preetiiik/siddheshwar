import {test,expect} from '@playwright/test';
for(const [width,height] of [[1440,900],[1263,665],[390,844]])test(`homepage reload shows complete hero at ${width}x${height}`,async({page})=>{
 await page.emulateMedia({reducedMotion:'no-preference'});await page.setViewportSize({width,height});await page.goto('/');
 await expect(page.locator('.s-hero h1')).toBeVisible();
 await page.locator('.s-footer').scrollIntoViewIfNeeded();
 await page.reload({waitUntil:'domcontentloaded'});
 await expect(page.locator('.s-hero h1')).toBeVisible();
 expect(await page.evaluate(()=>scrollY)).toBe(0);
 expect(await page.locator('.s-hero-media').evaluate(el=>getComputedStyle(el).clipPath)).toBe('none');
 for(const selector of ['.s-hero-reveal-word','.s-hero-model','.s-hero-copy .s-lead','.s-hero-cta-reveal'])expect(await page.locator(selector).first().evaluate(el=>getComputedStyle(el).opacity)).toBe('1');
 const hero=await page.locator('.s-hero').boundingBox();expect(hero!.y).toBe(0);
 await page.locator('.s-hero').focus();await page.keyboard.press('ArrowRight');await expect(page.locator('.s-hero-model')).toHaveText('Akubela HyPanel Supreme');
});
