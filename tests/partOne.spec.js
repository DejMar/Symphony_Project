import { test, expect } from '@playwright/test';
import { HomePage } from '../page-object/HomePage';
import { CompanyPage } from '../page-object/CompanyPage';
import { CareersPage } from '../page-object/CareersPage';
import { CaseStudiesPage } from '../page-object/CaseStudiesPage.js';
import { SharedSteps } from '../helper/SharedSteps';
import { comparingLinks } from "../data/dataLinks.js";

test.describe('Part one - tests', () => {
  let homePage;
  let careersPage;
  let companyPage;
  let caseStudiesPage;
  let sharedSteps;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    careersPage = new CareersPage(page);
    companyPage = new CompanyPage(page);
    caseStudiesPage = new CaseStudiesPage(page);
    sharedSteps = new SharedSteps(page);

    await page.goto('/');
    await page.setViewportSize({ width: 1920, height: 1080 });
    await sharedSteps.acceptCookies()
  });

  test.afterEach(async ({ page }, testInfo) => {
    await sharedSteps.takeScreenshotOnFailure(page, testInfo);
    console.log(`Finished ${test.info().title} with status ${test.info().status}`);
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
    const comparedFiles = await sharedSteps.compareTxtFiles(comparingLinks.comparedPath, comparingLinks.openJobPositionsTXTFile, comparingLinks.actualPath, comparingLinks.actualOpenJobsTXT);
    expect(comparedFiles).toBeTruthy();  
  });

  test('TC04 - Save jobs info in external file - JSON format', async ({ }) => {
    await homePage.navigateToCareerPage();
    await careersPage.verifyCareersPage();
    await careersPage.createJSONfile();
    const comparedFiles = await sharedSteps.compareJsonFiles(comparingLinks.comparedPath, comparingLinks.openJobPositionsFile, comparingLinks.actualPath, comparingLinks.actualOpenJobs);
    expect(comparedFiles).toBeTruthy();  
  });

  test('TC05 - Search for QA Automation Engineer job', async ({ }) => {
    await homePage.navigateToCareerPage();
    await careersPage.verifyCareersPage();
    const jobExists = await careersPage.searchJobTitle('QA Automation Engineer');
    expect(jobExists).toBeTruthy();
  });

  test.only('TC06 - Search for all QA jobs', async ({ }) => {
    await homePage.navigateToCareerPage();
    await careersPage.verifyCareersPage();
    const searchedJobs = await careersPage.searchJobTitleContains('QA');
    expect(searchedJobs).toBe(2);    
  });

  test('TC07 - Compare JSON files for company details', async ({ }) => {
    await homePage.navigateToCompanyPage();
    await companyPage.verifyCompanyPage();
    await companyPage.createCompanyInfoJSON();
    const comparedFiles = await sharedSteps.compareJsonFiles(comparingLinks.comparedPath, comparingLinks.companyInfoFile, comparingLinks.actualPath, comparingLinks.actualCompanyInfo);
    expect(comparedFiles).toBeTruthy();
  });

  test('TC08 - Verify Case studies are displayed', async ({ }) => {
    await homePage.navigateToCaseStudiesPage();
    await caseStudiesPage.createCaseStudiesJSON();
    const comparedFiles = await sharedSteps.compareJsonFiles(comparingLinks.comparedPath, comparingLinks.caseStudyFile, comparingLinks.actualPath, comparingLinks.actualCaseStudy);
    expect(comparedFiles).toBeTruthy();
    const selectedIndustry = await caseStudiesPage.selectRandomIndustry();
    const selectedService = await caseStudiesPage.selectRandomService();
    const tagsVerified = await caseStudiesPage.verifySelectedIndustryAndServiceTags(selectedIndustry, selectedService);
    expect(tagsVerified).toBeTruthy();
  });
})
