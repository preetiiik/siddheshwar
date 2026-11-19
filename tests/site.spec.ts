import { test, expect } from '@playwright/test';

const paths = ['/', '/what-we-do', '/brands', '/products', '/solutions', '/home-automation', '/audio-video', '/security-safety', '/networking', '/lighting', '/about', '/contact', '/support'];
for (const width of [1440, 1024, 768, 390, 360]) {
  test(`all 13 routes are usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const path of paths) {
      await page.goto(path);
      await expect(page.locator('h1')).toBeVisible();
      await expect(page).toHaveTitle(/Siddheshwar/);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), `overflow on ${path}`).toBeTruthy();
      const images = await page.locator('img').evaluateAll(images => images.map(img => img.getAttribute('src')));
      for (const src of [...new Set(images.filter(Boolean))]) {
        const response = await page.request.get(src!);
        expect(response.ok(), `missing image ${src}`).toBeTruthy();
      }
      const links = await page.locator('a').evaluateAll(links => links.map(link => link.getAttribute('href')).filter(href => href?.startsWith('/')));
      for (const href of links) expect(paths.includes(href!.split(/[?#]/)[0]) || href!.startsWith('/products/automation') || href!.startsWith('/products/categories/') || /^\/products\/[^/?#]+$/.test(href!.split(/[?#]/)[0]) || href!.startsWith('/solutions/'), `unknown route ${href}`).toBeTruthy();
    }
    expect(errors).toEqual([]);
  });
}
test('catalogue search, filters, accessible modal and enquiry', async ({ page }) => {
  await page.goto('/products');
  await page.getByRole('searchbox').fill('Aura Series Smart Switch');
  await expect(page.locator('.s-product-card')).toHaveCount(1);
  await page.locator('.s-product-card').click();
  await expect(page.locator('h1')).toHaveText('Aura Series Smart Switch');
  await page.locator('.dp-cta .dp-button').click();
  await expect(page.locator('.s-form-interest')).toContainText('Aura Series Smart Switch');
  await page.goto('/products');
  await page.getByRole('button', { name: 'Video Door Phones (VDP)', exact: true }).click();
  await expect(page.locator('.s-product-card')).toHaveCount(2);
  await page.goto('/products/lighting');
  await expect(page.locator('.s-product-card').first()).toBeVisible();
});
test('hero controls and mobile navigation', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('.s-hero .s-action').focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('h1')).toContainText('Intelligence');
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('h1')).toContainText('Peace of mind');
  await page.getByRole('button', { name: 'Open navigation' }).click();
  const nav = page.getByRole('navigation', { name: 'Main navigation', exact: true });
  await nav.getByRole('button', { name: /Solutions menu/ }).click();
  await nav.getByRole('link', { name: 'Smart Curtains', exact: true }).click();
  await expect(page).toHaveURL(/solutions\/curtain-blind-automation/);
  await expect(page.locator('.sd-hero h1')).toBeInViewport();
  await expect(page.getByRole('button', { name: 'Open navigation' })).toBeVisible();
});
test('scene switching, lighting filters and FAQ', async ({ page }) => {
  await page.goto('/home-automation');
  await page.getByRole('button', { name: 'Evening', exact: true }).click();
  await expect(page.locator('.auto-scene-card')).toContainText('A different atmosphere');
  await page.getByRole('button', { name: 'Morning', exact: true }).click();
  await expect(page.locator('.auto-scene-card')).toContainText('A gentle beginning');
  await page.goto('/products/lighting');
  for (const category of ['Downlights', 'Wall Lights', 'Decorative Lights', 'Outdoor Lights']) {
    await page.getByRole('button', { name: category, exact: true }).click();
    expect(await page.locator('.s-product-card').count()).toBeGreaterThan(0);
  }
  await page.goto('/support');
  await page.getByText('How do I get help with an existing product?').click();
  await expect(page.locator('details[open]')).toContainText('product model');
});
test('form validation and honest unconfigured submission', async ({ page }) => {
  for (const path of ['/contact', '/support']) {
    await page.goto(path);
    await page.locator('.s-form button[type="submit"]').click();
    await expect(page.locator('input[name="name"]')).toBeFocused();
    await page.getByLabel('Full Name', { exact: true }).fill('Test Visitor');
    await page.getByLabel('Phone Number', { exact: true }).fill('+91 98765 43210');
    await page.getByLabel('Email Address', { exact: true }).fill('test@example.com');
    await page.getByRole('combobox', { name: 'Service Interested In', exact: true }).selectOption('Home Automation');
    await page.locator('select[name="projectType"]').selectOption({ index: 1 });
    await page.locator('textarea').fill('Please help me plan a connected home.');
    await page.locator('.s-form button[type="submit"]').click();
    await expect(page.locator('.s-form [role="status"]')).toContainText('has not been sent');
  }
});

test('autoplay pauses on hover and interaction, and supports touch swipes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.clock.install();
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Technology meets');
  await page.locator('.s-hero .s-action').hover();
  await page.clock.fastForward(7000);
  await expect(page.locator('h1')).toContainText('Technology meets');
  await page.mouse.move(700, 350);
  await page.clock.fastForward(7000);
  await expect(page.locator('h1')).toContainText('Intelligence');
  await page.locator('.s-hero .s-action').focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('h1')).toContainText('brighter');
  await page.clock.fastForward(20000);
  await expect(page.locator('h1')).toContainText('brighter');
  await page.locator('.s-hero').evaluate(hero => {
    hero.dispatchEvent(new TouchEvent('touchstart', { bubbles: true, touches: [new Touch({ identifier: 1, target: hero, clientX: 300, clientY: 200 })] }));
    hero.dispatchEvent(new TouchEvent('touchend', { bubbles: true, changedTouches: [new Touch({ identifier: 1, target: hero, clientX: 100, clientY: 200 })] }));
  });
  await expect(page.locator('h1')).toContainText('Peace of mind');
});

test('homepage category cards open the filtered catalogue', async ({page})=>{
 await page.goto('/');await page.locator('.s-product-categories').getByRole('link',{name:'Explore Smart Touch Panels',exact:true}).click();
 await expect(page.getByRole('button',{name:'Smart Touch Panels',exact:true})).toHaveAttribute('aria-pressed','true');
});
