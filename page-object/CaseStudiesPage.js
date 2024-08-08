export class CaseStudiesPage {

    constructor(page) {
        this.page = page;
        this.caseStudiesListSelector = '.caseStudiesList--cards';
        this.caseStudyCardSelector = '.caseStudyCard';
        this.tagSelector = '.caseStudyCard--tags-tag';
        this.titleSelector = '.caseStudyCard--title';
        this.descriptionSelector = '.caseStudyCard--description';
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
}