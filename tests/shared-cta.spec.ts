import {test,expect} from '@playwright/test';
test('one consistent readable CTA across marketing, catalogue, collection and detail pages',async({page})=>{
 const paths=['/','/products','/solutions','/solutions/curtain-blind-automation','/products/categories/smart-touch-panels','/products/theben-ionprime-cph-knx','/products/automation/akubela','/products/automation/akubela/products'];
 for(const path of paths){await page.goto(path);const cta=page.locator('.s-contact-cta');await expect(cta).toHaveCount(1);await cta.scrollIntoViewIfNeeded();await expect(cta.locator('h2')).toHaveText('Ready to make yourspace smarter?');await expect(cta.locator('.s-eyebrow')).toHaveCSS('color','rgb(255, 255, 255)');await expect(cta.getByRole('link',{name:'Discuss Your Project'})).toBeVisible();await expect(cta.locator('h2')).toHaveAttribute('id',await cta.getAttribute('aria-labelledby'));}
});
test('shared product CTA preserves enquiry context and mobile readability',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/products/theben-ionprime-cph-knx');const cta=page.locator('.s-contact-cta');await cta.scrollIntoViewIfNeeded();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();await cta.getByRole('link',{name:'Discuss Your Project'}).click();await expect(page.locator('input[name=product]')).toHaveValue('iON Prime CP4 KNX');await expect(page.locator('input[name=brand]')).toHaveValue('Theben');
});
