import {test,expect} from '@playwright/test';
const categories=[['Smart Keypad Switches','smart-keypad-switches'],['Smart Remote Controls','smart-remote-controls'],['Curtain Controllers','curtain-controllers'],['Actuators & Gateways','actuators-gateways'],['Smart Touch Panels','smart-touch-panels'],['Video Door Phones (VDP)','video-door-phones'],['Smart Door Locks','smart-door-locks']];
test('seven category links select and persist the correct catalogue filter',async({page})=>{
 for(const [name,id] of categories){
  await page.goto('/');const section=page.locator('.s-product-categories');await expect(section.locator('.s-category-tile')).toHaveCount(7);
  await section.getByRole('link',{name:`Explore ${name}`,exact:true}).click();await expect(page).toHaveURL(new RegExp('products\\?category='+id));
  await expect(page.getByRole('button',{name,exact:true})).toHaveAttribute('aria-pressed','true');
  await page.reload();await expect(page.getByRole('button',{name,exact:true})).toHaveAttribute('aria-pressed','true');
  expect(await page.locator('.s-product-card').count()).toBeGreaterThan(0);
 }
});
for(const width of [1440,768,390,360])test(`category grid fits and precedes brands at ${width}px`,async({page})=>{
 await page.setViewportSize({width,height:900});await page.goto('/');const section=page.locator('.s-product-categories');await section.scrollIntoViewIfNeeded();
 await expect(section).toHaveCount(1);await expect(section.getByRole('heading',{name:'Shop by Category'})).toBeVisible();await expect(section.locator('.s-category-tile h3')).toHaveText(categories.map(c=>c[0]));
 expect(await section.evaluate(el=>el.nextElementSibling?.classList.contains('s-brands'))).toBeTruthy();
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 const tops=await section.locator('.s-category-tile').evaluateAll(es=>es.map(e=>Math.round(e.getBoundingClientRect().top)));
 if(width===1440){expect(new Set(tops).size).toBe(2);expect(tops[6]).toBe(tops[0]);}
 const animation=await page.locator('.s-marquee-track').evaluate(el=>getComputedStyle(el).animationName);expect(animation).toBe('none');
 if(width===1440||width===390)await section.screenshot({path:`tmp/category-grid-${width}.png`});
});
