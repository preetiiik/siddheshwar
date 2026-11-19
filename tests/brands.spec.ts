import { test, expect } from '@playwright/test';

for (const width of [1440, 390]) {
  test(`brand logos loop seamlessly at ${width}px`, async ({ page }, testInfo) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/');
    const section = page.locator('.s-brands');
    const marquee = section.locator('.s-marquee');
    const track = section.locator('.s-marquee-track');
    await marquee.scrollIntoViewIfNeeded();
    await expect(section.getByRole('img')).toHaveCount(7);
    await expect(section.locator('img')).toHaveCount(14);
    await expect(section.getByRole('link', { name: 'View All Brands' })).toHaveCount(0);
    for (const source of await section.locator('.s-marquee-group').first().locator('img').evaluateAll(images => images.map(image => image.getAttribute('src')))) {
      expect((await page.request.get(source!)).ok()).toBeTruthy();
    }
    const style = await track.evaluate(element => { const style = getComputedStyle(element); return { duration: style.animationDuration, timing: style.animationTimingFunction, iterations: style.animationIterationCount }; });
    expect(style).toEqual({ duration: '30s', timing: 'linear', iterations: 'infinite' });
    await marquee.hover();
    await expect.poll(() => track.evaluate(element => getComputedStyle(element).animationPlayState)).toBe('paused');
    await page.mouse.move(0, 0);
    await expect.poll(() => track.evaluate(element => getComputedStyle(element).animationPlayState)).toBe('running');
    await marquee.focus();
    await expect.poll(() => track.evaluate(element => getComputedStyle(element).animationPlayState)).toBe('paused');
    const geometry = await track.evaluate(element => {
      const groups = Array.from(element.children);
      const widths = groups.map(group => group.getBoundingClientRect().width);
      const animation = element.getAnimations()[0];
      animation.pause();
      animation.currentTime = 0;
      const start = new DOMMatrix(getComputedStyle(element).transform).m41;
      animation.currentTime = 15000;
      const middle = new DOMMatrix(getComputedStyle(element).transform).m41;
      animation.currentTime = 30000;
      const end = new DOMMatrix(getComputedStyle(element).transform).m41;
      animation.currentTime = 0;
      return { widths, start, middle, end };
    });
    expect(geometry.widths[0]).toBeCloseTo(geometry.widths[1], 2);
    expect(geometry.middle).toBeCloseTo(-geometry.widths[0] / 2, 1);
    expect(geometry.start).toBeCloseTo(geometry.end, 2);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    await section.screenshot({ path: testInfo.outputPath('brand-marquee.png'), style: '.s-header, .s-skip { visibility: hidden !important; }' });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await expect.poll(() => track.evaluate(element => getComputedStyle(element).animationName)).toBe('none');
    await expect(section.locator('.s-marquee-group[aria-hidden="true"]')).not.toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  });
}
