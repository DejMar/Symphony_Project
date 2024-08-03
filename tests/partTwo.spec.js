const { test, expect } = require('@playwright/test');

test('API - Endpoint 1', async ({ page }) => {
    const baseUrl = 'https://randomlyapi.symphony.is/api';

    const user = {
        username: `testuser_${Date.now()}`,
        password: 'TestPass123!',
        email: `testuser_${Date.now()}@example.com`
    };
    
    const signupResponse = await page.request.post(`${baseUrl}/auth/signup`, {
        data: user
    });
    const signupData = await signupResponse.json();
    console.log('Signup Response:', signupData);
});

test('API - Endpoint 2', async ({ page }) => {
    const loginResponse = await page.request.post(`${baseUrl}/auth/login`, {
        data: {
            username: user.username,
            password: user.password
        }
    });
    const loginData = await loginResponse.json();
    console.log('Login Response:', loginData);

    const token = loginData.token;

    // Set up the authenticated context
    const authContext = await browser.newContext({
        extraHTTPHeaders: {
            'Authorization': `Token ${token}`
        }
    });
    const authPage = await authContext.newPage();
});

test('API - Endpoint 3', async ({ page }) => {
    const postResponse = await authPage.request.post(`${baseUrl}/posts`, {
        data: {
            title: 'Test Post',
            content: 'This is a test post'
        }
    });
    const postData = await postResponse.json();
    console.log('Post Response:', postData);

    const postId = postData.id;
});

test('API - Endpoint 4', async ({ page }) => {
    const commentResponse = await authPage.request.post(`${baseUrl}/post-comments`, {
        data: {
            post: postId,
            content: 'This is a test comment'
        }
    });
    const commentData = await commentResponse.json();
    console.log('Comment Response:', commentData);
});

test('API - Endpoint 5', async ({ page }) => {
    const commentsResponse = await authPage.request.get(`${baseUrl}/posts/${postId}/comments`);
    const commentsData = await commentsResponse.json();
    console.log('Comments Data:', commentsData);

    await browser.close();
});