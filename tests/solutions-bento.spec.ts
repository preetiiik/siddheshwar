import {test,expect} from '@playwright/test';
for(const width of [1440,1024,768,390,360])test(`solutions bento at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/');const section=page.locator('.s-solutions-bento');await section.scrollIntoViewIfNeeded();
 await expect(section.getByRole('heading',{name:'Explore Our Solutions.',exact:true})).toBeVisible();await expect(section.locator('.s-bento-card')).toHaveCount(7);
 for(const img of await section.locator('img').all())await img.evaluate(async(el:HTMLImageElement)=>await el.decode());
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 if(width===1440){const normal=await section.locator('.s-bento-card').first().boundingBox();const featured=await section.locator('.is-featured').boundingBox();expect(featured!.height).toBeGreaterThan(normal!.height*2);await section.screenshot({path:'tmp/solutions-bento-desktop.png'});}
 if(width===390)await section.screenshot({path:'tmp/solutions-bento-mobile.png'});
 await section.getByRole('link',{name:/Smart Curtains/}).click();await expect(page).toHaveURL(/solutions#curtain-blind-automation/);await expect(page.locator('#curtain-blind-automation h2')).toBeInViewport();
});
