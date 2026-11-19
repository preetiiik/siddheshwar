import {test,expect} from '@playwright/test';
test('combined category and brand filters, search and canonical detail navigation',async({page})=>{
 for(const [category,brand,count] of [['smart-door-locks','Akubela',7],['smart-touch-panels','Basalte',2],['actuators-gateways','MDT',3]] as const){
  await page.goto(`/products?category=${category}&brand=${brand}`);await expect(page.locator('.pc-card')).toHaveCount(count);
  await expect(page.getByRole('button',{name:brand,exact:true})).toHaveAttribute('aria-pressed','true');await page.reload();await expect(page.locator('.pc-card')).toHaveCount(count);
 }
 await page.goto('/products?search=Aura');await expect(page.locator('.pc-card')).toHaveCount(1);await page.locator('.pc-card').click();await expect(page.locator('h1')).toHaveText('Aura Series Smart Switch');
 await page.goto('/products?category=smart-home-software-cloud');await expect(page.locator('.pc-software')).toHaveCount(4);
});
test('load more reveals all records and filtering resets the page size',async({page})=>{
 await page.goto('/products');await expect(page.locator('.pc-card')).toHaveCount(24);
 await page.getByRole('button',{name:'Load More Products'}).click();await expect(page.locator('.pc-card')).toHaveCount(48);
 while(await page.getByRole('button',{name:'Load More Products'}).count())await page.getByRole('button',{name:'Load More Products'}).click();
 await expect(page.locator('.pc-card')).toHaveCount(116);await page.getByRole('searchbox').fill('HyPanel');await expect(page.locator('.pc-card')).toHaveCount(11);
});
test('mobile filters expand, combine and collapse without overflow',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/products');const toggle=page.getByRole('button',{name:'Filter Products'});
 await expect(page.locator('.pc-sidebar')).not.toBeVisible();await toggle.click();await expect(page.locator('.pc-sidebar')).toBeVisible();
 await page.getByRole('button',{name:'Smart Door Locks',exact:true}).click();await page.getByRole('button',{name:'Akubela',exact:true}).click();await expect(page.locator('.pc-card')).toHaveCount(7);
 await page.getByRole('button',{name:'Hide Filters'}).click();await expect(page.locator('.pc-sidebar')).not.toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
});
test('brand marquee links open the matching filter and category overview stays singular',async({page})=>{
 await page.goto('/');await expect(page.locator('.s-product-categories')).toHaveCount(1);
 await page.getByRole('link',{name:'Explore Basalte products',exact:true}).click();await expect(page).toHaveURL(/products\?brand=Basalte/);await expect(page.locator('.pc-card')).toHaveCount(6);
});
test('desktop filter sidebar stays below the header while the catalogue scrolls',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto('/products');
 await expect(page.locator('.pc-sidebar')).toHaveCSS('position','sticky');
 await page.evaluate(()=>window.scrollTo(0,1100));
 await expect.poll(async()=>Math.round((await page.locator('.pc-sidebar').boundingBox())!.y)).toBe(110);
 expect(await page.locator('.pc-sidebar').evaluate(el=>el.scrollHeight>el.clientHeight)).toBeTruthy();
});
