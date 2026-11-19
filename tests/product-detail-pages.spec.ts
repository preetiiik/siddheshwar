import {test,expect} from '@playwright/test';

for(const batch of [0,1,2,3])test(`canonical product detail pages batch ${batch+1}`,async({page})=>{
 test.setTimeout(120000);
 await page.goto('/products');await page.locator('.pc-card').first().waitFor();
 const products=await page.evaluate(async()=>{const m=await import('/src/site/unified-catalogue.ts');return m.unifiedCatalogue;});
 expect(products).toHaveLength(116);expect(new Set(products.map(p=>p.detailPath)).size).toBe(116);
 const errors:string[]=[];page.on('pageerror',error=>errors.push(error.message));
 for(const p of products.slice(batch*30,(batch+1)*30)){
  await page.goto(p.detailPath!);await expect(page.locator('h1')).toHaveText(p.name);await expect(page).toHaveTitle(`${p.name} | Siddheshwar Smart Technologies`);
  await expect(page.locator('.dp-page>section')).toHaveCount(6);await expect(page.locator('.dp-image img')).toHaveAttribute('alt',p.alt);
  await expect(page.locator('.dp-image img')).toHaveCSS('object-fit','contain');
  const features=p.features.filter(f=>f.trim()&&f!==p.collection&&f!==p.subcategory).slice(0,6);
  await expect(page.locator('.dp-feature-grid>div')).toHaveCount(features.length);
  const specs=await page.locator('.dp-specifications dd').allTextContents();expect(specs.every(s=>s.trim().length>0)).toBeTruthy();
  expect(await page.locator('.dp-related-card').count()).toBeLessThanOrEqual(4);expect(await page.locator('.dp-related-card h3').allTextContents()).not.toContain(p.name);
  const href=await page.locator('.dp-cta .dp-button').getAttribute('href');const params=new URL(href!,'http://local').searchParams;
  expect(params.get('product')).toBe(p.name);expect(params.get('brand')).toBe(p.brand);expect(params.get('model')).toBe(p.modelNumber||p.name);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 }
 expect(errors).toEqual([]);
});
for(const width of [768,390])test(`responsive product pages and enquiry at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});
 for(const path of ['/products/theben-ionprime-cph-knx','/products/basalte-chopin','/products/automation/akubela/products/akubela-belahome-app']){
  await page.goto(path);await expect(page.locator('.dp-image img')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
  await page.reload();await expect(page.locator('.dp-page')).toBeVisible();
  await page.locator('.dp-cta .dp-button').click();
  for(const field of ['product','brand','model'])expect(await page.locator(`input[name="${field}"]`).inputValue()).not.toBe('');
 }
});
test('catalogue links, history, related products, aliases and invalid slugs',async({page})=>{
 await page.goto('/products?category=smart-touch-panels&brand=Theben');await page.locator('.pc-card').click();await expect(page.locator('h1')).toHaveText('iON Prime CP4 KNX');
 await expect(page.locator('.dp-spec-table')).toBeVisible();await page.goBack();await expect(page).toHaveURL(/category=smart-touch-panels&brand=Theben/);await page.goForward();await expect(page.locator('h1')).toHaveText('iON Prime CP4 KNX');
 const relatedName=await page.locator('.dp-related-card h3').first().textContent();await page.locator('.dp-related-card').first().click();await expect(page.locator('h1')).toHaveText(relatedName!);
 await page.goto('/products/approved-akubela-aura-series-smart-switch');await expect(page).toHaveURL(/\/products\/automation\/akubela\/products\/akubela-aura-series-smart-switch$/);await expect(page.locator('h1')).toHaveText('Aura Series Smart Switch');
 await page.goto('/products/this-model-does-not-exist');await expect(page.locator('.dp-not-found h1')).toHaveText('This product could not be found.');
});
