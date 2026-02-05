import { test, expect } from '@playwright/test';

test('user gets outfit recommendation', async ({ page }) => {
    // Navigate to home
    await page.goto('/');

    // Fill form
    await page.fill('[placeholder*="Malaga"]', 'Malaga, ES');

    // Set dates (today + 7 days)
    const today = new Date().toISOString().split('T')[0];
    await page.fill('input[type="date"]:first-of-type', today);

    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    await page.fill('input[type="date"]:last-of-type', nextWeek);

    // Submit
    await page.click('button:has-text("Lancer")');

    // Wait for result
    await expect(page.locator('text=Votre recommandation')).toBeVisible({ timeout: 10000 });
});
