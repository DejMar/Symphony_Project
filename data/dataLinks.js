export const comparingLinks = {
    comparedPath: '../../Symphony_project/data',
    actualPath: '../../Symphony_project/test-results',

    companyInfoFile: 'expectedValues.json',
    actualCompanyInfo: `companyInfo_${new Date().toISOString().split('T')[0]}.json`,

    caseStudyFile: 'caseStudies.json',
    actualCaseStudy: `caseStudies_${new Date().toISOString().split('T')[0]}.json`,

    openJobPositionsFile: 'openJobPositions.json',
    actualOpenJobs: `jobsJSON_${new Date().toISOString().split('T')[0]}.json`,

    openJobPositionsTXTFile: 'openJobPositions.txt',
    actualOpenJobsTXT: `jobsTXT_${new Date().toISOString().split('T')[0]}.txt`,
}