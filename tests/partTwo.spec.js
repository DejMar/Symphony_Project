const { test, expect } = require('@playwright/test');

test('UI - Verify symphony home page with name', async ({ page }) => {
    await page.goto('https://www.symphony.is/');
    await expect(page).toHaveScreenshot({
        fullPage: false,
        animations: 'disabled',
    });
});

test('UI - Verify symphony logo is displayed', async ({ page }) => {
    await page.goto('https://www.symphony.is/');
    const logoLocator = page.locator('//*[@id="__next"]/main/div[1]/header/div/div[1]/div/a/svg/path');
    await expect(logoLocator).toBeVisible();

    // Take a screenshot of the SVG element
    const svgElement = await logoLocator.evaluate(el => el.closest('svg'));
    expect(svgElement).not.toBeNull();

    await expect(page.locator('//*[@id="__next"]/main/div[1]/header/div/div[1]/div/a/svg')).toHaveScreenshot('symphony-logo.png', {
        animations: 'disabled',
        mask: [page.locator('body').locator(':not(//*[@id="__next"]/main/div[1]/header/div/div[1]/div/a/svg)')],
    });
});

test('UI - Verify How we work page', async ({ page }) => {
    await page.goto('https://symphony.is/how-we-work');
    await expect(page).toHaveScreenshot({
        fullPage: true,
    });
});

test('UI - Verify Careers page', async ({ page }) => {
    await page.goto('https://symphony.is/careers');
    await expect(page).toHaveScreenshot({
        fullPage: true,
    });
});

test('UI - Verify healthcare page', async ({ page }) => {
await page.goto('https://symphony.is/work/industries/healthcare');
    await expect(page).toHaveScreenshot({
        fullPage: true,
    });
});

