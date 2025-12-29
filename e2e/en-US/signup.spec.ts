import { test, expect } from '@playwright/test';

test.describe('Sign up', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/en-US/');
    await expect(page).toHaveTitle(
      'HOTEL PLANISPHERE - Website for Practice Test Automation',
    );
    await page.getByRole('link', { name: 'Sign up' }).click();
    await expect(page).toHaveTitle(/Sign up/);
  });

  test('It should be successful sign up', async ({ page }) => {
    await page.getByLabel('Email Required').fill('new-user@example.com');
    await page.getByLabel('Password Required').fill('password');
    await page.getByLabel('Password (confirmation) Required').fill('password');
    await page.getByLabel('Name Required').fill('new user 1');
    await page.getByLabel('Membership', { exact: true }).check();
    await page.getByLabel('Address').fill('New York City');
    await page.getByLabel('Tel').fill('01234567891');
    await page.getByLabel('Gender').selectOption({ label: 'female' });
    await page.getByLabel('Date of birth').fill('2000-01-01');
    await page.getByLabel('Receive notification').setChecked(true);
    await page.getByRole('button', { name: 'Sign up' }).click();

    await expect(page).toHaveTitle(/MyPage/);
    await expect(page.getByRole('heading', { level: 2 })).toHaveText('MyPage');
  });

  test('It should be an error when blank', async ({ page }) => {
    await page.getByLabel('Email Required').fill('');
    await page.getByLabel('Password Required').fill('');
    await page.getByLabel('Password (confirmation) Required').fill('');
    await page.getByLabel('Name Required').fill('');
    await page.getByLabel('PREMIUM Membership').check();
    await page.getByLabel('Address').fill('');
    await page.getByLabel('Tel').fill('');
    await page.getByLabel('Gender').selectOption({ label: 'I do not answer.' });
    await page.getByLabel('Date of birth').fill('');
    await page.getByLabel('Receive notification').setChecked(false);
    await page.getByRole('button', { name: 'Sign up' }).click();

    await expect(page.locator('#email ~ .invalid-feedback')).toHaveText(
      'Please fill out this field.',
    );
    await expect(page.locator('#password ~ .invalid-feedback')).toHaveText(
      'Please fill out this field.',
    );
    await expect(
      page.locator('#password-confirmation ~ .invalid-feedback'),
    ).toHaveText('Please fill out this field.');
    await expect(page.locator('#username ~ .invalid-feedback')).toHaveText(
      'Please fill out this field.',
    );
    await expect(page.locator('#address ~ .invalid-feedback')).toBeEmpty();
    await expect(page.locator('#tel ~ .invalid-feedback')).toBeEmpty();
    await expect(page.locator('#gender ~ .invalid-feedback')).toBeEmpty();
    await expect(page.locator('#birthday ~ .invalid-feedback')).toBeEmpty();
  });

  test('It should be an error when invalid value', async ({ page }) => {
    await page.getByLabel('Email Required').fill('a');
    await page.getByLabel('Password Required').fill('1234567');
    await page.getByLabel('Password (confirmation) Required').fill('1');
    await page.getByLabel('Name Required').fill('tester tester');
    await page.getByLabel('Membership', { exact: true }).check();
    await page.getByLabel('Address').fill('Chicago, Illinois');
    await page.getByLabel('Tel').fill('1234567890');
    await page.getByLabel('Gender').selectOption({ label: 'other' });
    await page.getByLabel('Date of birth').fill('2000-01-01');
    await page.getByLabel('Receive notification').setChecked(true);
    await page.getByRole('button', { name: 'Sign up' }).click();

    await expect(page.locator('#email ~ .invalid-feedback')).toHaveText(
      'Please enter a non-empty email address.',
    );
    await expect(page.locator('#password ~ .invalid-feedback')).toHaveText(
      'Please lengthen this text to 8 characters or more.',
    );
    await expect(
      page.locator('#password-confirmation ~ .invalid-feedback'),
    ).toHaveText('Please lengthen this text to 8 characters or more.');
    await expect(page.locator('#username ~ .invalid-feedback')).toBeEmpty();
    await expect(page.locator('#address ~ .invalid-feedback')).toBeEmpty();
    await expect(page.locator('#tel ~ .invalid-feedback')).toHaveText(
      'Please match the requested format.',
    );
    await expect(page.locator('#gender ~ .invalid-feedback')).toBeEmpty();
    await expect(page.locator('#birthday ~ .invalid-feedback')).toBeEmpty();
  });

  test('It should be an error when email has already been taken', async ({
    page,
  }) => {
    await page.getByLabel('Email Required').fill('new-user@example.com');
    await page.getByLabel('Password Required').fill('password');
    await page.getByLabel('Password (confirmation) Required').fill('password');
    await page.getByLabel('Name Required').fill('new user 1');
    await page.getByLabel('Membership', { exact: true }).check();
    await page.getByLabel('Address').fill('Las Vegas, Nevada');
    await page.getByLabel('Tel').fill('01234567891');
    await page.getByLabel('Gender').selectOption({ label: 'female' });
    await page.getByLabel('Date of birth').fill('2000-01-01');
    await page.getByLabel('Receive notification').setChecked(true);
    await page.getByRole('button', { name: 'Sign up' }).click();

    await expect(page).toHaveTitle(/MyPage/);
    await expect(page.getByRole('heading', { level: 2 })).toHaveText('MyPage');

    await page.getByRole('button', { name: 'Logout' }).click();
    await expect(page).toHaveTitle(
      'HOTEL PLANISPHERE - Website for Practice Test Automation',
    );
    await page.getByRole('link', { name: 'Sign up' }).click();
    await expect(page).toHaveTitle(/Sign up/);

    await page.getByLabel('Email Required').fill('new-user@example.com');
    await page.getByLabel('Password Required').fill('password');
    await page.getByLabel('Password (confirmation) Required').fill('password');
    await page.getByLabel('Name Required').fill('new user 1');
    await page.getByLabel('Membership', { exact: true }).check();
    await page.getByLabel('Address').fill('Las Vegas, Nevada');
    await page.getByLabel('Tel').fill('01234567891');
    await page.getByLabel('Gender').selectOption({ label: 'female' });
    await page.getByLabel('Date of birth').fill('2000-01-01');
    await page.getByLabel('Receive notification').setChecked(true);
    await page.getByRole('button', { name: 'Sign up' }).click();

    await expect(page.locator('#email ~ .invalid-feedback')).toHaveText(
      'Email has already been taken.',
    );
  });

  test("It should be an error when password doesn't match", async ({
    page,
  }) => {
    await page.getByLabel('Email Required').fill('');
    await page.getByLabel('Password Required').fill('password');
    await page.getByLabel('Password (confirmation) Required').fill('123456789');
    await page.getByLabel('Name Required').fill('new user 1');
    await page.getByLabel('Membership', { exact: true }).check();
    await page.getByLabel('Address').fill('Kansas City, Missouri');
    await page.getByLabel('Tel').fill('01234567891');
    await page.getByLabel('Gender').selectOption({ label: 'male' });
    await page.getByLabel('Date of birth').fill('2000-01-01');
    await page.getByLabel('Receive notification').setChecked(true);
    await page.getByRole('button', { name: 'Sign up' }).click();

    await expect(
      page.locator('#password-confirmation ~ .invalid-feedback'),
    ).toHaveText("Password doesn't match.");
  });
});
