import { test, expect } from '@playwright/test';
for (const width of [1440,1263,1024,768,390,360]) {
 test(`why choose section fits at ${width}px`,async({page})=>{
  await page.setViewportSize({width,height:800});await page.goto('/');const section=page.locator('#what-we-do');await section.scrollIntoViewIfNeeded();
  await expect(section).toHaveCount(1);await expect(section.getByRole('heading',{name:'Why Choose Siddheshwar?'})).toBeVisible();
  await expect(section.locator('li')).toHaveCount(4);await expect(section.locator('img')).toHaveCount(1);
  await section.locator('img').evaluate(async(el:HTMLImageElement)=>await el.decode());
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
  await section.getByRole('link',{name:/Trusted Technology Brands/}).click();await expect(page).toHaveURL(/\/brands$/);
 });
}
