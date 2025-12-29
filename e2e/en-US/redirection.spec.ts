import { test, expect } from '@playwright/test';

test.describe('Redirection', () => {
  const BASE_URL_LOCALE = '/en-US';

  test('It should redirect MyPage to Top when not logged in', async ({
    page,
  }) => {
    await page.goto(`${BASE_URL_LOCALE}/mypage.html`);
    await expect(page).toHaveURL(/index\.html$/);
  });

  test('It should redirect Login to Top when logged in', async ({ page }) => {
    await page.goto(`${BASE_URL_LOCALE}/`);
    await expect(page).toHaveTitle(
      'HOTEL PLANISPHERE - Website for Practice Test Automation',
    );
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveTitle(/Login/);
    await page.getByLabel('Email').fill('clark@example.com');
    await page.getByLabel('Password').fill('password');
    await page.getByRole('button', { name: 'Login' }).last().click();
    await expect(page).toHaveTitle(/MyPage/);
    await page.goto(`${BASE_URL_LOCALE}/login.html`);
    await expect(page).toHaveURL(/index\.html$/);
  });

  test('It should redirect Sign Up to Top when logged in', async ({ page }) => {
    await page.goto(`${BASE_URL_LOCALE}/`);
    await expect(page).toHaveTitle(
      'HOTEL PLANISPHERE - Website for Practice Test Automation',
    );
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveTitle(/Login/);
    await page.getByLabel('Email').fill('clark@example.com');
    await page.getByLabel('Password').fill('password');
    await page.getByRole('button', { name: 'Login' }).last().click();
    await expect(page).toHaveTitle(/MyPage/);
    await page.goto(`${BASE_URL_LOCALE}/signup.html`);
    await expect(page).toHaveURL(/index\.html$/);
  });

  test('It should redirect Reserve to Top when invalid plan id [1]', async ({
    page,
  }) => {
    await page.goto(`${BASE_URL_LOCALE}/reserve.html?plan-id=100`);
    await expect(page).toHaveURL(/index\.html$/);
  });

  test('It should redirect Reserve to Top when invalid plan id [2]', async ({
    page,
  }) => {
    await page.goto(`${BASE_URL_LOCALE}/reserve.html?plan-id=abc`);
    await expect(page).toHaveURL(/index\.html$/);
  });

  test('It should redirect Reserve to Top when invalid plan id [3]', async ({
    page,
  }) => {
    await page.goto(`${BASE_URL_LOCALE}/reserve.html`);
    await expect(page).toHaveURL(/index\.html$/);
  });

  test("It should redirect Reserve to Top when not logged in user access member's plan", async ({
    page,
  }) => {
    await page.goto(`${BASE_URL_LOCALE}/reserve.html?plan-id=3`);
    await expect(page).toHaveURL(/index\.html$/);
  });

  test("It should redirect Reserve to Top when not logged in user access premium member's plan", async ({
    page,
  }) => {
    await page.goto(`${BASE_URL_LOCALE}/reserve.html?plan-id=1`);
    await expect(page).toHaveURL(/index\.html$/);
  });

  test("It should redirect Reserve to Top when normal user access premium member's plan", async ({
    page,
  }) => {
    await page.goto(`${BASE_URL_LOCALE}/`);
    await expect(page).toHaveTitle(
      'HOTEL PLANISPHERE - Website for Practice Test Automation',
    );
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveTitle(/Login/);
    await page.getByLabel('Email').fill('diana@example.com');
    await page.getByLabel('Password').fill('pass1234');
    await page.getByRole('button', { name: 'Login' }).last().click();
    await expect(page).toHaveTitle(/MyPage/);
    await page.goto(`${BASE_URL_LOCALE}/reserve.html?plan-id=1`);
    await expect(page).toHaveURL(/index\.html$/);
  });

  test('It should redirect Confirm to Top when direct access', async ({
    page,
  }) => {
    await page.goto(`${BASE_URL_LOCALE}/confirm.html`);
    await expect(page).toHaveURL(/index\.html$/);
  });
});
