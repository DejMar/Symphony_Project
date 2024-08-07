import { expect } from '@playwright/test';
const expectedValues = require('../data/expectedValues.json');

export class CompanyPage {

    constructor(page) {
        this.page = page;
        this.companyURL = 'https://symphony.is/about-us/company';
        this.hqLocator = page.locator("//li[.//strong[text()='HQ']]//span");
        this.foundedLocator = page.locator("//li[.//strong[text()='Founded']]//span");
        this.sizeLocator = page.locator("//li[.//strong[text()='Size']]//span");
        this.consultingLocationsLocator = page.locator("//li[.//strong[text()='Consulting Locations']]//span");
        this.engineeringHubsLocator = page.locator("//li[.//strong[text()='Engineering Hubs']]//span");
        this.clientsLocator = page.locator("//li[.//strong[text()='Clients']]//span");
        this.certificationsLocator = page.locator("//li[.//strong[text()='Certifications']]//span");
    }

    verifyCompanyPage = async () => {
        expect(this.page.url()).toBe(this.companyURL);
    }

    verifyCompanyDetails = async () => {
        const hq = await this.hqLocator.textContent();
        const founded = await this.foundedLocator.textContent();
        const size = await this.sizeLocator.textContent();
        const consultingLocations = await this.consultingLocationsLocator.allTextContents();
        const engineeringHubs = await this.engineeringHubsLocator.allTextContents();
        const clients = await this.clientsLocator.textContent();
        const certifications = await this.certificationsLocator.allTextContents();

        expect(hq).toBe(expectedValues.hq);
        expect(founded).toBe(expectedValues.founded);
        expect(size).toBe(expectedValues.size);
        expect(consultingLocations).toEqual(expectedValues.consultingLocations);
        expect(engineeringHubs).toEqual(expectedValues.engineeringHubs);
        expect(clients).toBe(expectedValues.clients);
        //expect(certifications.map(cert => cert.trim())).toEqual(expectedValues.certifications);
        expect(certifications).toEqual(expectedValues.certifications);
    }

    createCompanyInfoJSON = async () => {
        await this.page.waitForSelector('.pageMetaDetails--list', { state: 'visible' });

        const companyInfo = {
            hq: await this.hqLocator.textContent(),
            founded: await this.foundedLocator.textContent(),
            size: await this.sizeLocator.textContent(),
            consultingLocations: await this.consultingLocationsLocator.allTextContents(),
            engineeringHubs: await this.engineeringHubsLocator.allTextContents(),
            clients: await this.clientsLocator.textContent(),
            certifications: await this.certificationsLocator.allTextContents()
        };

        const fs = require('fs');
        const path = require('path');
        const testResultsDir = path.join(__dirname, '..', 'test-results');
        
        if (!fs.existsSync(testResultsDir)) {
            fs.mkdirSync(testResultsDir, { recursive: true });
        }

        const filePath = path.join(testResultsDir, `companyInfo_${new Date().toISOString().split('T')[0]}.json`);

        fs.writeFileSync(filePath, JSON.stringify(companyInfo, null, 2), 'utf8');
    }
}