import { test, expect, chromium } from '@playwright/test';

test('EPAM: Services -> Explore Our Client Work -> verify Client Work text', async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto('https://www.epam.com/', { waitUntil: 'domcontentloaded' });

    await page.getByRole('link', { name: /^Services$/ }).click();
    await page.waitForLoadState('domcontentloaded');

    await page.getByRole('link', { name: /Explore Our Client Work/i }).click();
    await page.waitForLoadState('domcontentloaded');

    await expect(page.getByText('Client Work', { exact: false })).toBeVisible();
  } finally {
    await context.close();
    await browser.close();
  }
});

