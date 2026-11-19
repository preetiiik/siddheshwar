import {test,expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
const collections: {slug:string;name:string;heading:string;products:{brand:string;name:string;image:string;placeholder:boolean}[]}[]=JSON.parse(readFileSync(new URL('../src/site/product-collection-details.json',import.meta.url),'utf8'));
for(const width of [1440,768,390])test(`seven product collections work at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 for(const c of collections){
  await page.goto(`/products/categories/${c.slug}`);
  await expect(page.locator('h1')).toHaveText(c.heading);await expect(page).toHaveTitle(`${c.name} | Siddheshwar Smart Technologies`);
  await expect(page.locator('.pd-page>section')).toHaveCount(7);
  const models=await page.evaluate(async slug=>{const m=await import('/src/site/unified-catalogue.ts');return m.unifiedCatalogue.filter((p:{primaryCategory?:string})=>p.primaryCategory===slug).map((p:{name:string;brand:string})=>({name:p.name,brand:p.brand}));},c.slug);
  await expect(page.locator('.pd-model h3')).toHaveText(models.map(p=>p.name));
  await expect(page.locator('.pd-model-copy>p')).toHaveText(models.map(p=>p.brand));
  expect(new Set(c.products.map(p=>p.image)).size).toBe(c.products.length);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
  for(const image of c.products)expect((await page.request.get(image.image)).ok(),image.image).toBeTruthy();
  for(const link of await page.locator('.pd-model').all())expect(await link.getAttribute('href')).toMatch(/^\/products\//);
  const first=models[0];await page.locator('.pd-model').first().click();await expect(page.locator('h1')).toHaveText(first.name);
 }
 expect(errors).toEqual([]);
});
test('all collection guides are discoverable and catalogue filters remain available',async({page})=>{
 await page.goto('/products');for(const c of collections){await page.goto(`/products?category=${c.slug}`);await expect(page.locator(`.pc-collection-link[href="/products/categories/${c.slug}"]`)).toHaveCount(1);}
 await page.getByRole('button',{name:'Smart Touch Panels',exact:true}).click();await page.getByRole('link',{name:'Explore this collection',exact:true}).click();await expect(page).toHaveURL(/products\/categories\/smart-touch-panels$/);
 await page.getByRole('link',{name:'Browse existing catalogue products'}).click();await expect(page.getByRole('button',{name:'Smart Touch Panels',exact:true})).toHaveAttribute('aria-pressed','true');
});
