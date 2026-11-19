import { test,expect } from '@playwright/test';
test('category and brand filters persist and show only available brands',async({page})=>{
 await page.goto('/products');
 await expect(page.locator('h1')).toHaveText('Explore Our Products');
 await expect(page.locator('.pc-sidebar [aria-label="Filter product categories"] button')).toHaveCount(13);
 await expect(page.locator('.pc-hero-image')).toBeVisible();await expect(page.locator('.pc-hero h1')).toHaveCSS('color','rgb(255, 255, 255)');
 await page.getByRole('button',{name:'Smart Touch Panels',exact:true}).click();
 await page.getByRole('button',{name:'Theben',exact:true}).click();
 await expect(page.locator('.pc-card')).not.toHaveCount(0);
 for(const brand of await page.locator('.pc-card .pc-brand').allTextContents())expect(brand).toBe('Theben');
 await page.reload();await expect(page.getByRole('button',{name:'Theben',exact:true})).toHaveAttribute('aria-pressed','true');
 await page.getByRole('searchbox').fill('CP4');await expect(page.locator('.pc-card')).toHaveCount(1);
 await page.locator('.pc-card').click();await expect(page.locator('h1')).toHaveText('iON Prime CP4 KNX');await page.goBack();
 await page.getByRole('searchbox').fill('');await page.getByRole('button',{name:'Smart Door Locks',exact:true}).click();
 await expect(page.getByRole('button',{name:'Theben',exact:true})).toHaveCount(0);
 await expect(page.getByRole('button',{name:'OneTouch',exact:true})).toBeVisible();
});
for(const width of [1440,768,390])test(`products palette layout at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/products');await expect(page.locator('.pc-card').first()).toBeVisible();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 await expect(page.locator('h1')).toHaveCSS('font-family','"Clash Display", Arial, sans-serif');
 await page.screenshot({path:`tmp/products-approved-palette-${width}.png`});
});
