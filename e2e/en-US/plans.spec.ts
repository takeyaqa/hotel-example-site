import { test, expect } from '@playwright/test';

test.describe('Plans', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en-US/');
    await expect(page).toHaveTitle(
      'HOTEL PLANISPHERE - Website for Practice Test Automation',
    );
  });

  test('It should be display plans when not logged in', async ({ page }) => {
    await page.getByRole('link', { name: 'Reserve' }).click();
    await expect(page).toHaveTitle(/Plans/);

    await expect(page.getByRole('status')).toBeHidden();
    await expect(page.getByRole('heading', { level: 5 })).toHaveText([
      'Plan with special offers',
      'Staying without meals',
      'Business trip',
      'With beauty salon',
      'With private onsen',
      'For honeymoon',
      'With complimentary ticket',
    ]);
  });

  test('It should be display plans when logged in member', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveTitle(/Login/);

    await page.getByLabel('Email').fill('diana@example.com');
    await page.getByLabel('Password').fill('pass1234');
    await page.getByRole('button', { name: 'Login' }).last().click();
    await expect(page).toHaveTitle(/MyPage/);

    await page.getByRole('link', { name: 'Reserve' }).click();
    await expect(page).toHaveTitle(/Plans/);

    await expect(page.getByRole('status')).toBeHidden();
    await expect(page.getByRole('heading', { level: 5 })).toHaveText([
      'Plan with special offers',
      'With dinner',
      'Economical',
      'Staying without meals',
      'Business trip',
      'With beauty salon',
      'With private onsen',
      'For honeymoon',
      'With complimentary ticket',
    ]);
  });

  test('It should be display plans when logged in premium member', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveTitle(/Login/);

    await page.getByLabel('Email').fill('clark@example.com');
    await page.getByLabel('Password').fill('password');
    await page.getByRole('button', { name: 'Login' }).last().click();
    await expect(page).toHaveTitle(/MyPage/);

    await page.getByRole('link', { name: 'Reserve' }).click();
    await expect(page).toHaveTitle(/Plans/);

    await expect(page.getByRole('status')).toBeHidden();
    await expect(page.getByRole('heading', { level: 5 })).toHaveText([
      'Plan with special offers',
      'Premium plan',
      'With dinner',
      'Economical',
      'Staying without meals',
      'Business trip',
      'With beauty salon',
      'With private onsen',
      'For honeymoon',
      'With complimentary ticket',
    ]);
  });
});
