import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Sömu próf keyra gegn báðum útgáfum; engin undanþága fyrir A.
test.beforeEach(async ({ page }, info) => {
  await page.goto(`/${info.project.metadata.route}/`);
});
const book = page => page.getByRole('article').filter({ has: page.getByRole('heading', { name: 'Norðurljós', exact: true }) });
const opener = page => book(page).getByRole('button', { name: 'Norðurljós', exact: true });
const save = page => book(page).getByRole('button', { name: 'Save Norðurljós', exact: true });

// Leitar að stjórntæki eingöngu með Tab; ekki með mouse/focus() eða DOM-breytingu.
async function tabTo(page, locator, max = 24) {
  for (let i = 0; i < max; i++) {
    if (await locator.evaluate(el => el === document.activeElement)) return;
    await page.keyboard.press('Tab');
  }
  await expect(locator).toBeFocused();
}
async function searchBook(page) {
  await page.getByRole('searchbox', { name: 'Search', exact: true }).fill('Norðurljós');
  await expect(page.getByRole('article')).toHaveCount(1);
}

test('01 — semantic structure, eight JSON items and images', async ({ page }) => {
  await expect(page.getByRole('banner')).toHaveCount(1);
  await expect(page.getByRole('navigation', { name: 'Aðalvalmynd' })).toHaveCount(1);
  await expect(page.getByRole('main')).toHaveCount(1);
  await expect(page.getByRole('contentinfo')).toHaveCount(1);
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.getByRole('article')).toHaveCount(8);
  const outline = await page.locator('h1,h2,h3,h4,h5,h6').evaluateAll(nodes => nodes.filter(n => n.getClientRects().length).map(n => Number(n.tagName[1])));
  expect(outline.every((level, i) => i === 0 || level <= outline[i - 1] + 1)).toBe(true);
  for (const image of await page.getByRole('article').locator('img').all()) {
    await expect(image).toHaveAttribute('alt', '');
    await expect.poll(() => image.evaluate(el => el.complete && el.naturalWidth > 0)).toBe(true);
  }
  await expect(page.getByRole('article').locator('img')).toHaveCount(8);
  for (const section of ['search', 'details', 'signup']) {
    await expect(page.locator(`nav a[href="#${section}"]`)).toHaveCount(1);
    await expect(page.locator(`#${section}`)).toHaveCount(1);
  }
});

test('02 — keyboard-only complete main task', async ({ page }) => {
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Fara beint í efni' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('main')).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('searchbox', { name: 'Search', exact: true })).toBeFocused();
  await page.keyboard.type('Norðurljós');
  await expect(page.getByRole('article')).toHaveCount(1);
  await page.keyboard.press('Tab');
  await expect(opener(page)).toBeFocused();
  await page.keyboard.press('Enter');
  const dialog = page.getByRole('dialog', { name: 'Norðurljós', exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('button', { name: 'Close', exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(opener(page)).toBeFocused();
  await page.keyboard.press('Tab');
  await expect(save(page)).toBeFocused();
  await page.keyboard.press('Space');
  await expect(save(page)).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('Shift+Tab');
  await expect(opener(page)).toBeFocused();
  await tabTo(page, page.getByRole('textbox', { name: 'Name', exact: true }));
  await page.keyboard.type('Test Reader');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('textbox', { name: 'Email', exact: true })).toBeFocused();
  await page.keyboard.type('reader@example.com');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('combobox', { name: 'Reading format', exact: true })).toBeFocused();
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('checkbox', { name: 'I agree to join the reading club', exact: true })).toBeFocused();
  await page.keyboard.press('Space');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', { name: 'Skrá mig', exact: true })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('#signup').getByRole('status')).toContainText(/takk|tókst/i);
});

test('03 — keyboard focus has a visible outline', async ({ page }) => {
  await page.keyboard.press('Tab');
  const skip = page.getByRole('link', { name: 'Fara beint í efni' });
  await expect(skip).toBeFocused();
  await expect(skip).toBeInViewport();
  await page.keyboard.press('Enter');
  await page.keyboard.press('Tab');
  const field = page.getByRole('searchbox', { name: 'Search', exact: true });
  await expect(field).toBeFocused();
  const style = await field.evaluate(el => {
    const s = getComputedStyle(el);
    return { style: s.outlineStyle, width: parseFloat(s.outlineWidth), color: s.outlineColor };
  });
  expect(style.style).not.toBe('none');
  expect(style.width).toBeGreaterThanOrEqual(2);
  expect(style.color).not.toBe('rgba(0, 0, 0, 0)');
});

test('04 — dialog traps focus and returns it after Escape and Close', async ({ page }) => {
  await searchBook(page);
  await opener(page).click();
  const dialog = page.getByRole('dialog', { name: 'Norðurljós', exact: true });
  await expect(dialog).toBeVisible();
  for (const key of ['Tab', 'Tab', 'Shift+Tab', 'Shift+Tab']) {
    await page.keyboard.press(key);
    expect(await dialog.evaluate(el => el.contains(document.activeElement))).toBe(true);
  }
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(opener(page)).toBeFocused();
  await page.keyboard.press('Enter');
  await dialog.getByRole('button', { name: 'Close', exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(opener(page)).toBeFocused();
});

test('05 — result count is a live status and no-results state works', async ({ page }) => {
  const count = page.locator('#results-count');
  await expect(count).toHaveAttribute('role', 'status');
  await expect(count).toContainText('8');
  await searchBook(page);
  await expect(count).toContainText('1');
  await page.getByRole('searchbox', { name: 'Search', exact: true }).fill('zzzz-nothing');
  await expect(page.getByRole('article')).toHaveCount(0);
  await expect(count).toContainText('0');
  await page.getByRole('searchbox', { name: 'Search', exact: true }).fill('');
  await expect(page.getByRole('article')).toHaveCount(8);
});

test('06 — form errors appear after submit and are associated with fields', async ({ page }) => {
  await expect(page.locator('[aria-invalid="true"]')).toHaveCount(0);
  await page.getByRole('button', { name: 'Skrá mig', exact: true }).click();
  const name = page.getByRole('textbox', { name: 'Name', exact: true });
  await expect(name).toBeFocused();
  for (const control of [name, page.getByRole('textbox', { name: 'Email', exact: true }), page.getByRole('combobox', { name: 'Reading format', exact: true }), page.getByRole('checkbox', { name: 'I agree to join the reading club', exact: true })]) {
    await expect(control).toHaveAttribute('aria-invalid', 'true');
    const description = await control.getAttribute('aria-describedby');
    expect(description).toBeTruthy();
    const visibleError = await control.evaluate(el => (el.getAttribute('aria-describedby') || '').split(/\s+/).some(id => {
      const node = document.getElementById(id);
      return node && node.getClientRects().length > 0 && /villa|veldu|samþykk|sláðu/i.test(node.textContent);
    }));
    expect(visibleError).toBe(true);
  }
});

test('07 — save is named, keyboard-operable and large enough', async ({ page }) => {
  await searchBook(page);
  await expect(save(page)).toHaveAttribute('aria-pressed', 'false');
  const box = await save(page).boundingBox();
  expect(box.width).toBeGreaterThanOrEqual(24);
  expect(box.height).toBeGreaterThanOrEqual(24);
  await save(page).press('Space');
  await expect(save(page)).toHaveAttribute('aria-pressed', 'true');
  await expect(book(page)).toContainText('Vistað');
  await save(page).press('Space');
  await expect(save(page)).toHaveAttribute('aria-pressed', 'false');
});

test('08 — axe has no serious or critical findings in three states', async ({ page }) => {
  for (const state of ['default', 'dialog', 'errors']) {
    if (state === 'dialog') await opener(page).click();
    if (state === 'errors') {
      await page.keyboard.press('Escape');
      await page.getByRole('button', { name: 'Skrá mig', exact: true }).click();
    }
    const results = await new AxeBuilder({ page }).analyze();
    await test.info().attach(`axe-${state}`, { body: JSON.stringify(results, null, 2), contentType: 'application/json' });
    expect(results.violations.filter(v => ['serious', 'critical'].includes(v.impact)), state).toEqual([]);
  }
});

test('09 — narrow layout does not overflow', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await expect(page.getByRole('searchbox', { name: 'Search', exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await opener(page).click();
  const dialog = page.getByRole('dialog', { name: 'Norðurljós', exact: true });
  await expect(dialog).toBeVisible();
  expect(await dialog.evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
});
