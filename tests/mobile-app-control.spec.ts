import {test,expect} from '@playwright/test';
for(const width of [1440,768,390])test(`mobile app control placement and interaction at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:950});await page.goto('/');const section=page.locator('.mac-section');await expect(section).toHaveCount(1);await section.scrollIntoViewIfNeeded();
 expect(await section.evaluate(e=>e.nextElementSibling?.classList.contains('s-approach-home'))).toBeTruthy();expect(await section.evaluate(e=>e.previousElementSibling?.classList.contains('hpc-section'))).toBeTruthy();
 await expect(section.locator('h2')).toHaveText('Your Home. Your Control.One Tap Away.');
 await expect(section.locator('.mac-controls button')).toHaveCount(4);
 for(const feature of ['Smart Lighting','Smart Curtains','Climate Control','Smart Scenes']){const button=section.getByRole('button',{name:feature,exact:true});await button.click();await expect(button).toHaveAttribute('aria-pressed','true');await expect(section.locator('.mac-feature-preview h3')).toHaveText(feature);await expect(section.locator('.mac-controls button[aria-pressed=true]')).toHaveCount(1);}
 await expect(section.locator('.mac-device image')).toHaveAttribute('href','/products/akubela/akubela-belahome-app.webp');expect((await page.request.get('/products/akubela/akubela-belahome-app.webp')).ok()).toBeTruthy();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 await section.getByRole('link',{name:'Explore Smart Home Solutions',exact:true}).click();await expect(page).toHaveURL(/solutions\/home-automation$/);await expect(page.locator('h1')).toHaveText('One Connected Home. Endless Possibilities.');
});
test('homepage app preview links to the actual supported app record',async({page})=>{
 await page.goto('/');await page.locator('.mac-section').getByRole('link',{name:'View app information'}).click();await expect(page.locator('h1')).toHaveText('BelaHome App');
});
