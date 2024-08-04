import { expect } from '@playwright/test';

export class CareersPage {

    constructor(page) {
        this.page = page;
        this.careersPage = page.locator('span.header--nav-label:has-text("Careers")');
        this.careerURL = 'https://symphony.is/careers';
        this.openingJobsLocator = page.locator("//li[contains(@class, 'currentOpenings--job')]");
        this.jobTitleLocator = page.locator(".currentOpenings--job-title");
        this.jobLocationLocator = page.locator(".currentOpenings--job-locationWrapper-name");
        this.jobTypeLocator = page.locator(".currentOpenings--job-type");
    }

    navigateToCareersPage = async () => {
        await this.careersPage.hover();
        await this.careersPage.click();
    }

    verifyCareersPage = async () => {
        expect(this.page.url()).toBe(this.careerURL);
    }

    createJSONfile = async () => {
        await this.page.waitForSelector(this.openingJobsLocator._selector, { state: 'visible' });
        const jobElements = await this.openingJobsLocator.all();
        const jobs = [];
        for (const jobElement of jobElements) {
            const title = await jobElement.locator(this.jobTitleLocator).textContent();
            const location = await jobElement.locator(this.jobLocationLocator).textContent();
            const type = await jobElement.locator(this.jobTypeLocator).textContent();
            jobs.push({ title, location, type });
        }

        const fs = require('fs');
        fs.writeFileSync('jobsJSON.json', JSON.stringify(jobs, null, 2));
    }

    createTXTFile = async () => {
        await this.page.waitForSelector(this.openingJobsLocator._selector, { state: 'visible' });
        const jobElements = await this.openingJobsLocator.all();
        const jobs = [];
        for (const jobElement of jobElements) {
            const title = await jobElement.locator(this.jobTitleLocator).textContent();
            const location = await jobElement.locator(this.jobLocationLocator).textContent();
            const type = await jobElement.locator(this.jobTypeLocator).textContent();
            jobs.push(`${title}, ${location}, ${type}`);
        }

        const fs = require('fs');
        fs.writeFileSync('jobsTXT.txt', jobs.join('\n'), 'utf8');
    }

    countJobOpenings = async () => {
        await this.page.waitForSelector(this.openingJobsLocator._selector, { state: 'visible' });
        const jobElements = await this.openingJobsLocator.all();
        const numberOfJobOpenings = jobElements.length;

        return numberOfJobOpenings;
    }
    searchForJob = async (jobTitle) => {
        await this.page.waitForSelector(this.openingJobsLocator._selector, { state: 'visible' });
        const jobElements = await this.openingJobsLocator.all();

        for (const jobElement of jobElements) {
            const title = await jobElement.locator(this.jobTitleLocator).textContent();

            if (title === jobTitle) {
                return true;
            }
        }

        return false;
    }
}