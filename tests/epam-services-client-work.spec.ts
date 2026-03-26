import { test, expect, chromium } from '@playwright/test';

/**
 * Test Scenario: EPAM Services - Client Work Navigation
 *
 * Steps:
 * 1. Navigate to https://www.epam.com/
 * 2. Select "Services" from the header menu
 * 3. Click the "Explore Our Client Work" link
 * 4. Verify that the "Client Work" text is visible on the page
 */

test.describe('EPAM Services - Client Work Navigation', () => {
  test('should navigate to Client Work page via Services menu', async () => {
    // Launch browser
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
    });
    const page = await context.newPage();

    try {
      // Step 1: Navigate to https://www.epam.com/
      await page.goto('https://www.epam.com/', {
        waitUntil: 'domcontentloaded',
        timeout: 30000,
      });
      console.log('✅ Step 1: Navigated to https://www.epam.com/');

      // Handle cookie consent banner if present
      const cookieAcceptBtn = page.locator(
        'button#onetrust-accept-btn-handler'
      );
      if (await cookieAcceptBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
        await cookieAcceptBtn.click();
        console.log('🍪 Cookie consent accepted');
      }

      // Step 2: Select "Services" from the header menu
      const servicesMenuItem = page.locator(
        'nav a[href*="services"], header a[href*="services"], .top-navigation a:has-text("Services")'
      );
      await servicesMenuItem.first().waitFor({ state: 'visible', timeout: 15000 });
      await servicesMenuItem.first().click();
      console.log('✅ Step 2: Clicked "Services" from the header menu');

      // Wait for the Services page to load
      await page.waitForLoadState('domcontentloaded');

      // Step 3: Click the "Explore Our Client Work" link
      const exploreClientWorkLink = page.locator(
        'a:has-text("Explore Our Client Work"), a[href*="client"]:has-text("Client Work"), a:has-text("client work")'
      );
      await exploreClientWorkLink.first().waitFor({ state: 'visible', timeout: 15000 });
      await exploreClientWorkLink.first().click();
      console.log('✅ Step 3: Clicked "Explore Our Client Work" link');

      // Wait for navigation to complete
      await page.waitForLoadState('domcontentloaded');

      // Step 4: Verify that the "Client Work" text is visible on the page
      const clientWorkText = page.locator(
        'text=Client Work, h1:has-text("Client Work"), h2:has-text("Client Work"), [class*="title"]:has-text("Client Work")'
      );
      await expect(clientWorkText.first()).toBeVisible({ timeout: 15000 });
      console.log('✅ Step 4: "Client Work" text is visible on the page');

      console.log('\n🎉 All steps passed successfully!');
    } finally {
      // Always close the browser
      await browser.close();
      console.log('🔒 Browser closed');
    }
  });
});
