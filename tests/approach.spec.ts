import {test,expect} from '@playwright/test';
for(const width of [1440,1024,768,390,360])test(`approach section at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/');const section=page.locator('.s-approach-home');await section.scrollIntoViewIfNeeded();
 await expect(section).toHaveCount(1);await expect(section.locator('.s-approach-principle')).toHaveCount(4);await expect(section.locator('.s-approach-orbit-icon')).toHaveCount(4);await section.locator('img').evaluate(async(img:HTMLImageElement)=>await img.decode());
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 if(width===1440)await section.screenshot({path:'tmp/approach-desktop.png'});
 if(width===390)await section.screenshot({path:'tmp/approach-mobile.png'});
 await section.getByRole('link',{name:'Discover Our Story'}).click();await expect(page).toHaveURL(/\/about$/);
});
