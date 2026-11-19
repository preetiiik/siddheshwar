import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
const solutions: {slug:string;name:string;title:string;overviewTitle:string;featureTitle:string;capabilityTitle:string;processTitle:string;showcaseTitle:string;applicationsTitle:string;ctaTitle:string}[] = JSON.parse(readFileSync(new URL('../src/site/solution-details.json', import.meta.url), 'utf8')); 

for (const width of [1440, 768, 390]) {
 test(`six solution pages retain content, images and consultation links at ${width}px`, async ({page}) => {
  await page.setViewportSize({width,height:900});
  const errors:string[]=[];
  page.on('pageerror',e=>errors.push(e.message));
  for (const s of solutions) {
   await page.goto(`/solutions/${s.slug}`);
   await expect(page.getByRole('heading',{level:1})).toHaveText(s.title);
   await expect(page).toHaveTitle(`${s.name} | Siddheshwar Smart Technologies`);
   await expect(page.locator('.sd-page>section')).toHaveCount(8);
   await expect(page.locator('.sd-feature-grid h3')).toHaveCount(3);
   await expect(page.locator('.sd-capability-grid h3')).toHaveCount(6);
   await expect(page.locator('.sd-process li')).toHaveCount(4);
   await expect(page.locator('.sd-applications li')).toHaveCount(4);
   const headings=await page.locator('.sd-page h2').allTextContents();
   expect(headings).toEqual([s.overviewTitle,s.featureTitle,s.capabilityTitle,s.processTitle,s.showcaseTitle,s.applicationsTitle,'Ready to make yourspace smarter?']);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
   const images=await page.locator('.sd-page img').evaluateAll(imgs=>imgs.map(i=>i.getAttribute('src')!));
   for (const src of new Set(images)) expect((await page.request.get(src)).ok(),src).toBeTruthy();
   for (const link of await page.locator('.sd-page .s-action').all()) expect(await link.getAttribute('href')).toBe(`/contact?interest=${encodeURIComponent(s.name)}`);
   await page.locator('.sd-final .s-action').click();
   await expect(page.locator('.s-form-interest')).toContainText(s.name);
  }
  expect(errors).toEqual([]);
 });
}
test('homepage and listing expose all six detail pages without removing existing anchors',async({page})=>{
 await page.goto('/');
 await expect(page.locator('.s-bento-card')).toHaveCount(4);
 for(const slug of ['intelligent-lighting-automation','climate-hvac-automation','curtain-blind-automation','smart-entertainment']) await expect(page.locator(`.s-bento-card[href="/solutions/${slug}"]`)).toHaveCount(1);
 await expect(page.getByRole('link',{name:'EXPLORE SOLUTIONS',exact:true})).toHaveAttribute('href','/solutions');
 await page.goto('/solutions');
 for(const s of solutions) await expect(page.locator(`.s-editorial .s-action[href="/solutions/${s.slug}"]`)).toHaveCount(1);
 await page.goto('/solutions#curtain-blind-automation');
 await expect(page.locator('#curtain-blind-automation h2')).toBeInViewport();
});
