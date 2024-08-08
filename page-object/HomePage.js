export class HomePage {

    constructor(page) {
        this.page = page;
        this.careersLink = page.locator('span.header--nav-label:has-text("Careers")');
        this.caseStudiesLink = page.locator('span.header--nav-label:has-text("Case Studies")')
        //this.careersLink = page.locator('//span[contains(@class, 'header--nav-label') and text()='Careers']');
        //this.aboutUsLink = 'a.header--nav-link:has-text("About Us")';
        //this.companyLink = 'a.header--nav-link:has-text("About Us") + div a:has-text("Company")';
        this.aboutUsLink = page.locator("//span[contains(@class, 'header--nav-label') and text()='About Us ']");
        this.companyLink = page.locator('//a[@href="/about-us/company" and text()="Company"]');
    }

    navigateToCareerPage = async () => {
        await this.careersLink.hover();
        await this.careersLink.click();
    }

    navigateToCompanyPage = async () => {
        await this.aboutUsLink.hover();
        await this.companyLink.click();
    }

    navigateToCaseStudiesPage = async () => {
        await this.caseStudiesLink.hover();
        await this.caseStudiesLink.click();
    }
}