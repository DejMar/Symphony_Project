import { expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export class CareersPage {

    constructor(page) {
        this.page = page;
        this.careersPage = page.locator("//span[@class='header--nav-label' and text()='Careers']");
        this.careerURL = 'https://symphony.is/careers';
        this.openingJobsLocator = page.locator("//li[contains(@class, 'currentOpenings--job')]");
        this.jobTitleLocator = page.locator(".currentOpenings--job-title");
        //this.jobTitleLocator = page.locator("//div[@class='currentOpenings--job-title']")
        this.jobLocationLocator = page.locator(".currentOpenings--job-locationWrapper-name");
        this.jobTypeLocator = page.locator(".currentOpenings--job-type");
    }
//#region Methods
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

        //const fs = require('fs');
        //const path = require('path');
        const testResultsDir = path.join(__dirname, '..', 'test-results');
        
        if (!fs.existsSync(testResultsDir)) {
            fs.mkdirSync(testResultsDir, { recursive: true });
        }
        const filePath = path.join(testResultsDir, `jobsJSON_${new Date().toISOString().split('T')[0]}.json`);

        fs.writeFileSync(filePath, JSON.stringify(jobs, null, 2));
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

        //const fs = require('fs');
        //const path = require('path');
        const testResultsDir = path.join(__dirname, '..', 'test-results');
        
        if (!fs.existsSync(testResultsDir)) {
            fs.mkdirSync(testResultsDir, { recursive: true });
        }

        const filePath = path.join(testResultsDir, `jobsTXT_${new Date().toISOString().split('T')[0]}.txt`);

        fs.writeFileSync(filePath, jobs.join('\n'), 'utf8');
    }

    countJobOpenings = async () => {
        await this.page.waitForSelector(this.jobTitleLocator._selector, { state: 'visible' });
        const jobElements = await this.jobTitleLocator.allTextContents();
        const numberOfJobOpenings = jobElements.length;

        return numberOfJobOpenings;
    }
        
    searchJobTitle = async (jobTitle) => {
        await this.page.waitForSelector(this.jobTitleLocator._selector, { state: 'visible' });
        const jobTitles = await this.jobTitleLocator.allTextContents();
        
        return jobTitles.includes(jobTitle);
    }

    searchJobTitleContains = async (searchString) => {
        await this.page.waitForSelector(this.jobTitleLocator._selector, { state: 'visible' });
        const jobTitles = await this.jobTitleLocator.allTextContents();
        
        let count = 0;
        for (const title of jobTitles) {
            if (title.toLowerCase().includes(searchString.toLowerCase())) {
                count++;
            }
        }
        return count;
    }
    //#endregion
}