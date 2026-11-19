import {test,expect} from '@playwright/test';
test('homepage product range follows solutions, filters correctly and links to detail pages',async({page})=>{
 await page.goto('/');const section=page.locator('.hpc-section');await expect(section).toHaveCount(1);
 expect(await section.evaluate(e=>e.previousElementSibling?.classList.contains('s-solutions-bento'))).toBeTruthy();
 await expect(section.locator('.hpc-card')).toHaveCount(116);
 await expect(section.locator('.hpc-card h3').allTextContents()).resolves.toEqual(expect.arrayContaining(['HyPanel Supreme','HyPanel Lux Ring','HyPanel Lux Piano','HyPanel Lux Vase']));
 expect((await section.locator('.hpc-card h3').allTextContents()).slice(0,4)).toEqual(['HyPanel Supreme','HyPanel Lux Ring','HyPanel Lux Piano','HyPanel Lux Vase']);
 for(const [name,count] of [['Smart Touch Panels',23],['Curtain Controllers',5],['Smart Remote Controls',4],['Smart Keypad Switches',20],['Actuators & Gateways',15],['Video Door Phones (VDP)',2],['Smart Door Locks',10]] as const){await section.getByRole('button',{name,exact:true}).click();await expect(section.locator('.hpc-card')).toHaveCount(count);}
 await section.getByRole('button',{name:'All Products',exact:true}).click();await section.locator('.hpc-card').first().click();await expect(page.locator('h1')).toHaveText('HyPanel Supreme');
});
for(const width of [1440,768,390])test(`horizontal product carousel navigation and layout at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/');const section=page.locator('.hpc-section');await section.scrollIntoViewIfNeeded();const track=section.locator('.hpc-track');
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();expect(await track.evaluate(e=>e.scrollWidth>e.clientWidth)).toBeTruthy();
 await section.getByRole('button',{name:'Next products',exact:true}).click();await expect.poll(()=>track.evaluate(e=>e.scrollLeft)).toBeGreaterThan(100);
 await track.focus();await page.keyboard.press('End');await expect(section.getByRole('button',{name:'Next products',exact:true})).toBeDisabled();await page.keyboard.press('Home');await expect(section.getByRole('button',{name:'Previous products',exact:true})).toBeDisabled();
 await section.getByRole('button',{name:'Smart Remote Controls',exact:true}).click();await expect.poll(()=>track.evaluate(e=>e.scrollLeft)).toBeLessThan(5);
 await section.getByRole('link',{name:'Explore All Products',exact:true}).click();await expect(page).toHaveURL(/products\?category=smart-remote-controls$/);
});
