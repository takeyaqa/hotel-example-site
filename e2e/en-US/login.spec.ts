import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en-US/');
    await expect(page).toHaveTitle(
      'HOTEL PLANISPHERE - Website for Practice Test Automation',
    );
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveTitle(/Login/);
  });

  test('It should be successful logged in preset user', async ({ page }) => {
    await page.getByLabel('Email').fill('clark@example.com');
    await page.getByLabel('Password').fill('password');
    await page.getByRole('button', { name: 'Login' }).last().click();

    await expect(page).toHaveTitle(/MyPage/);
    await expect(page.getByRole('heading', { level: 2 })).toHaveText('MyPage');
  });

  test('It should be an error when empty input', async ({ page }) => {
    await page.getByLabel('Email').fill('');
    await page.getByLabel('Password').fill('');
    await page.getByRole('button', { name: 'Login' }).last().click();

    await expect(page.locator('#email-message')).toHaveText(
      'Please fill out this field.',
    );
    await expect(page.locator('#password-message')).toHaveText(
      'Please fill out this field.',
    );
  });

  test('It should be an error when invalid user', async ({ page }) => {
    await page.getByLabel('Email').fill('error@example.com');
    await page.getByLabel('Password').fill('error');
    await page.getByRole('button', { name: 'Login' }).last().click();

    await expect(page.locator('#email-message')).toHaveText(
      'Email or password is invalid.',
    );
    await expect(page.locator('#password-message')).toHaveText(
      'Email or password is invalid.',
    );
  });
});
