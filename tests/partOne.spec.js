import { test, expect } from '@playwright/test';
import { HomePage } from '../page-object/homePage';
import { CompanyPage } from '../page-object/CompanyPage'
import { CareersPage } from '../page-object/careersPage';

test.describe('Part one - tests', () => {
  let homePage;
  let careersPage;
  let companyPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    careersPage = new CareersPage(page);
    companyPage = new CompanyPage(page);
    await page.goto('/');
    await page.setViewportSize({ width: 1920, height: 1080 });
  });

  test('TC01 - Verify Company Details on Home page', async ({ }) => {
    await homePage.navigateToCompanyPage();
    await companyPage.verifyCompanyPage();
    await companyPage.verifyCompanyDetails();
  });

  test('TC02 - Verify number of all job openings', async ({ }) => {
    await homePage.navigateToCareerPage();
    await careersPage.verifyCareersPage();
    const numberOfJobOpenings = await careersPage.countJobOpenings();
    expect(numberOfJobOpenings).toBe(10);
  });

  test('TC03 - Save jobs info in external file - TXT format', async ({ }) => {
    await homePage.navigateToCareerPage();
    await careersPage.verifyCareersPage();
    await careersPage.createTXTFile();
  });

  test('TC04 - Save jobs info in external file - JSON format', async ({ }) => {
    await homePage.navigateToCareerPage();
    await careersPage.verifyCareersPage();
    await careersPage.createJSONfile();
  });

  test('TC05 - Search for QA Automation Engineer job', async ({ }) => {
    await homePage.navigateToCareerPage();
    await careersPage.verifyCareersPage();
    const jobExists = await careersPage.searchJobTitle('QA Automation Engineer');
    expect(jobExists).toBeTruthy();
  });
})
