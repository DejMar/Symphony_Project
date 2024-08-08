import { SharedSteps } from '../helper/SharedSteps';

export class CaseStudiesPage {

    constructor(page) {
        this.page = page;
        this.sharedSteps = new SharedSteps(page);

        this.caseStudiesListSelector = '.caseStudiesList--cards';
        this.caseStudyCardSelector = '.caseStudyCard';
        this.tagSelector = '.caseStudyCard--tags-tag';
        this.titleSelector = '.caseStudyCard--title';
        this.descriptionSelector = '.caseStudyCard--description';
        this.industrySelector = '.caseStudiesHeader--container-form-fields-field.defaultOption--select';
        this.serviceSelector = '.caseStudiesHeader--container-form-fields-field.defaultOption--select[placeholder="Service"]';
    }

    navigateToCareerPage = async () => {
        
    }

    async createCaseStudiesJSON() {
        await this.page.waitForSelector(this.caseStudiesListSelector);
        
        const caseStudies = await this.page.$$eval(this.caseStudyCardSelector, (cards, selectors) => {
            return cards.map(card => ({
                tags: Array.from(card.querySelectorAll(selectors.tagSelector)).map(tag => tag.textContent.trim()),
                title: card.querySelector(selectors.titleSelector).textContent.trim(),
                description: card.querySelector(selectors.descriptionSelector).textContent.trim()
            }));
        }, {
            tagSelector: this.tagSelector,
            titleSelector: this.titleSelector,
            descriptionSelector: this.descriptionSelector
        });

        const fs = require('fs');
        const path = require('path');
        const testResultsDir = path.join(__dirname, '..', 'test-results');
        
        if (!fs.existsSync(testResultsDir)) {
            fs.mkdirSync(testResultsDir, { recursive: true });
        }

        const filePath = path.join(testResultsDir, `caseStudies_${new Date().toISOString().split('T')[0]}.json`);
        fs.writeFileSync(filePath, JSON.stringify(caseStudies, null, 2));
    }
    
    async selectRandomIndustry() {
        return this.sharedSteps.selectRandomOption(this.industrySelector);
    }

    async selectRandomService() {
        return this.sharedSteps.selectRandomOption(this.serviceSelector);
    }
    async verifySelectedIndustryAndServiceTags(selectedIndustry, selectedService) {
        await this.page.waitForSelector(this.caseStudyCardSelector);

        const tagsMatch = await this.page.$$eval(this.caseStudyCardSelector, (cards, { tagSelector, selectedIndustry, selectedService }) => {
            for (const card of cards) {
                const tags = Array.from(card.querySelectorAll(tagSelector)).map(tag => tag.textContent.trim());
                if (tags.includes(selectedIndustry) && tags.includes(selectedService)) {
                    return true;
                }
            }
            return false;
        }, {
            tagSelector: this.tagSelector,
            selectedIndustry,
            selectedService
        });

        if (!tagsMatch) {
            throw new Error(`No case study found with both tags: ${selectedIndustry} and ${selectedService}`);
        }

        console.log(`Verified case study with tags: ${selectedIndustry} and ${selectedService}`);
        return true;
    }
}