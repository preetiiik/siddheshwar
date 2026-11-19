import {test,expect} from '@playwright/test';
test('desktop dropdowns open on hover and labels navigate',async({page})=>{
 await page.setViewportSize({width:1440,height:900});await page.goto('/');const nav=page.getByRole('navigation',{name:'Main navigation',exact:true});
 for(const name of ['Products','Solutions']){
  await nav.getByRole('link',{name,exact:true}).hover();await expect(nav.getByRole('link',{name:`All ${name}`,exact:true})).toBeVisible();
  await nav.getByRole('link',{name:'Audio & Video',exact:true}).hover();await expect(nav.getByRole('link',{name:'Audio & Video',exact:true})).toBeVisible();
  await nav.getByRole('link',{name,exact:true}).click();await expect(page).toHaveURL(new RegExp('/'+name.toLowerCase()+'$'));await expect(page.locator('h1')).toBeVisible();
 }
});
test('keyboard and mobile dropdown navigation works',async({page})=>{
 await page.goto('/');const nav=page.getByRole('navigation',{name:'Main navigation',exact:true});await nav.getByRole('link',{name:'Products',exact:true}).focus();await page.keyboard.press('ArrowDown');await expect(nav.getByRole('link',{name:'All Products',exact:true})).toBeFocused();await page.keyboard.press('Escape');await expect(nav.getByRole('link',{name:'Products',exact:true})).toBeFocused();
 await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Open navigation'}).click();await nav.getByRole('button',{name:'Open Solutions menu'}).click();await nav.getByRole('link',{name:'Networking',exact:true}).click();await expect(page).toHaveURL(/networking$/);await expect(page.locator('h1')).toBeVisible();
});
test('all five service pages work from solutions dropdown',async({page})=>{
 const paths=[['Home Automation','home-automation'],['Audio & Video','audio-video'],['Security & Safety','security-safety'],['Networking','networking'],['Lighting','lighting']];
 for(const [name,path] of paths){await page.goto('/');const nav=page.getByRole('navigation',{name:'Main navigation',exact:true});await nav.getByRole('link',{name:'Solutions',exact:true}).hover();await nav.getByRole('link',{name,exact:true}).click();await expect(page).toHaveURL(new RegExp('/'+path+'$'));await expect(page.locator('h1')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();}
});

test('desktop labels and chevrons stay on one line',async({page})=>{
 for(const width of [1440,1263,1024,901]){
  await page.setViewportSize({width,height:665});await page.goto('/');
  const groups=page.locator('.s-header .s-dropdown');
  for(const group of await groups.all()){
   const label=await group.locator('.s-dropdown-label').boundingBox();const toggle=await group.locator('.s-dropdown-toggle').boundingBox();
   expect(Math.abs(label!.y+label!.height/2-toggle!.y-toggle!.height/2)).toBeLessThan(1);
   expect(toggle!.x).toBeGreaterThanOrEqual(label!.x+label!.width);
  }
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
 }
});
