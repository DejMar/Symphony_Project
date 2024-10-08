import fs from 'fs';
import path from 'path';

export class SharedSteps {
    constructor(page) {
        this.page = page;
        this.cookieOKButton = "//button[@class='cookiesBanner--btn cookiesBanner--btn_purple']";
    }

    async compareJsonFiles(filePath1, fileName1, filePath2, fileName2) {
        const fullFilePath1 = path.join(__dirname, filePath1, fileName1);
        const fullFilePath2 = path.join(__dirname, filePath2, fileName2);

        const file1 = JSON.parse(fs.readFileSync(fullFilePath1, 'utf8'));
        const file2 = JSON.parse(fs.readFileSync(fullFilePath2, 'utf8'));

        return JSON.stringify(file1) === JSON.stringify(file2);
    }
    
    async compareTxtFiles(filePath1, fileName1, filePath2, fileName2) {
        const fullFilePath1 = path.join(__dirname, filePath1, fileName1);
        const fullFilePath2 = path.join(__dirname, filePath2, fileName2);

        const file1Content = fs.readFileSync(fullFilePath1, 'utf8');
        const file2Content = fs.readFileSync(fullFilePath2, 'utf8');

        return file1Content === file2Content;
    }

    async acceptCookies() {
        try {
            await this.page.waitForSelector(this.cookieOKButton, { state: 'visible', timeout: 5000 });
            await this.page.click(this.cookieOKButton);
            console.log('Cookies accepted');
        } catch (error) {
            console.log('Cookie banner not found or already accepted');
        }
    }

    async selectRandomOption(selector) {
        await this.page.waitForSelector(selector);

        const randomOption = await this.page.evaluate((sel) => {
            const select = document.querySelector(sel);
            const options = Array.from(select.options);
            const randomIndex = Math.floor(Math.random() * options.length);
            const selectedOption = options[randomIndex];
            select.value = selectedOption.value;
            select.dispatchEvent(new Event('change'));
            return {
                value: selectedOption.value,
                text: selectedOption.text
            };
        }, selector);

        console.log(`Selected random option: ${randomOption.text}`);
        return randomOption.text;
    }

    async takeScreenshotOnFailure(page, testInfo) {
        if (testInfo.status !== 'passed') {
            const screenshotPath = `screenshots/${testInfo.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.png`;
            await page.screenshot({ path: screenshotPath, fullPage: true });
            console.log(`Screenshot saved: ${screenshotPath}`);
        }
    }
}