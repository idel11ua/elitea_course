import { test, expect } from '@playwright/test';

/**
 * Test Scenario: EPAM Services - Explore Client Work
 *
 * Steps:
 * 1. Navigate to https://www.epam.com/
 * 2. Select "Services" from the header menu
 * 3. Click the "Explore Our Client Work" link
 * 4. Verify that the "Client Work" text is visible on the page
 */

test.describe('EPAM Services - Client Work Navigation', () => {
  test('should navigate to Client Work page via Services menu', async ({ page }) => {
    // Step 1: Navigate to EPAM homepage
    await page.goto('https://www.epam.com/');
    await expect(page).toHaveTitle(/EPAM/);

    // Step 2: Select "Services" from the header menu
    // Click the Services link in the main navigation
    const servicesLink = page.getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Services' })
      .first();
    await servicesLink.click();

    // Verify we are on the Services page
    await expect(page).toHaveURL('https://www.epam.com/services');

    // Step 3: Click the "Explore Our Client Work" link
    const exploreClientWorkLink = page.getByRole('link', { name: 'Explore Our Client Work' });
    await expect(exploreClientWorkLink).toBeVisible();
    await exploreClientWorkLink.click();

    // Verify we are on the Client Work page
    await expect(page).toHaveURL('https://www.epam.com/services/client-work');

    // Step 4: Verify that "Client Work" text is visible on the page
    const clientWorkHeading = page.getByRole('heading', { name: 'Client Work', level: 1 });
    await expect(clientWorkHeading).toBeVisible();
  });
});
