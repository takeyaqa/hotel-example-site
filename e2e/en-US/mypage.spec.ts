import path from 'node:path';
import { test, expect } from '@playwright/test';

test.describe('MyPage', () => {
  test.describe('Preset Users', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/en-US/');
      await expect(page).toHaveTitle(
        'HOTEL PLANISPHERE - Website for Practice Test Automation',
      );
      await page.getByRole('button', { name: 'Login' }).click();
      await expect(page).toHaveTitle(/Login/);
    });

    test('It should be display preset user [clark]', async ({ page }) => {
      await page.getByLabel('Email').fill('clark@example.com');
      await page.getByLabel('Password').fill('password');
      await page.getByRole('button', { name: 'Login' }).last().click();
      await expect(page).toHaveTitle(/MyPage/);

      await expect(page.locator('#email')).toHaveText('clark@example.com');
      await expect(page.locator('#username')).toHaveText('Clark Evans');
      await expect(page.locator('#rank')).toHaveText('Premium');
      await expect(page.locator('#address')).toHaveText(
        'Mountain View, California',
      );
      await expect(page.locator('#tel')).toHaveText('01234567891');
      await expect(page.locator('#gender')).toHaveText('male');
      await expect(page.locator('#birthday')).toHaveText('not answered');
      await expect(page.locator('#notification')).toHaveText('received');
    });

    test('It should be display preset user [diana]', async ({ page }) => {
      await page.getByLabel('Email').fill('diana@example.com');
      await page.getByLabel('Password').fill('pass1234');
      await page.getByRole('button', { name: 'Login' }).last().click();
      await expect(page).toHaveTitle(/MyPage/);

      await expect(page.locator('#email')).toHaveText('diana@example.com');
      await expect(page.locator('#username')).toHaveText('Diana Johansson');
      await expect(page.locator('#rank')).toHaveText('Normal');
      await expect(page.locator('#address')).toHaveText('Redmond, Washington');
      await expect(page.locator('#tel')).toHaveText('not answered');
      await expect(page.locator('#gender')).toHaveText('female');
      await expect(page.locator('#birthday')).toHaveText('April 1, 2000');
      await expect(page.locator('#notification')).toHaveText('not received');
    });

    test('It should be display preset user [ororo]', async ({ page }) => {
      await page.getByLabel('Email').fill('ororo@example.com');
      await page.getByLabel('Password').fill('pa55w0rd!');
      await page.getByRole('button', { name: 'Login' }).last().click();
      await expect(page).toHaveTitle(/MyPage/);

      await expect(page.locator('#email')).toHaveText('ororo@example.com');
      await expect(page.locator('#username')).toHaveText('Ororo Saldana');
      await expect(page.locator('#rank')).toHaveText('Premium');
      await expect(page.locator('#address')).toHaveText(
        'Cupertino, California',
      );
      await expect(page.locator('#tel')).toHaveText('01212341234');
      await expect(page.locator('#gender')).toHaveText('other');
      await expect(page.locator('#birthday')).toHaveText('December 17, 1988');
      await expect(page.locator('#notification')).toHaveText('not received');
    });

    test('It should be display preset user [miles]', async ({ page }) => {
      await page.getByLabel('Email').fill('miles@example.com');
      await page.getByLabel('Password').fill('pass-pass');
      await page.getByRole('button', { name: 'Login' }).last().click();
      await expect(page).toHaveTitle(/MyPage/);

      await expect(page.locator('#email')).toHaveText('miles@example.com');
      await expect(page.locator('#username')).toHaveText('Miles Boseman');
      await expect(page.locator('#rank')).toHaveText('Normal');
      await expect(page.locator('#address')).toHaveText('not answered');
      await expect(page.locator('#tel')).toHaveText('01298765432');
      await expect(page.locator('#gender')).toHaveText('not answered');
      await expect(page.locator('#birthday')).toHaveText('August 31, 1992');
      await expect(page.locator('#notification')).toHaveText('received');
    });
  });

  test.describe('New User', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/en-US/');
      await expect(page).toHaveTitle(
        'HOTEL PLANISPHERE - Website for Practice Test Automation',
      );
      await page.getByRole('link', { name: 'Sign up' }).click();
      await expect(page).toHaveTitle(/Sign up/);
      await page.getByLabel('Email Required').fill('new-user@example.com');
      await page.getByLabel('Password Required').fill('11111111');
      await page
        .getByLabel('Password (confirmation) Required')
        .fill('11111111');
      await page.getByLabel('Name Required').fill('Jane Doe');
      await page.getByLabel('Membership', { exact: true }).check();
      await page.getByLabel('Address').fill('Detroit, Michigan');
      await page.getByLabel('Tel').fill('09876543211');
      await page.getByLabel('Gender').selectOption({ label: 'female' });
      await page.getByLabel('Date of birth').fill('2000-01-01');
      await page.getByLabel('Receive notification').setChecked(false);
      await page.getByRole('button', { name: 'Sign up' }).click();
      await expect(page).toHaveTitle(/MyPage/);
      await expect(page.getByRole('heading', { level: 2 })).toHaveText(
        'MyPage',
      );
    });

    test('It should be display new user', async ({ page }) => {
      await expect(page.locator('#email')).toHaveText('new-user@example.com');
      await expect(page.locator('#username')).toHaveText('Jane Doe');
      await expect(page.locator('#rank')).toHaveText('Normal');
      await expect(page.locator('#address')).toHaveText('Detroit, Michigan');
      await expect(page.locator('#tel')).toHaveText('09876543211');
      await expect(page.locator('#gender')).toHaveText('female');
      await expect(page.locator('#birthday')).toHaveText('January 1, 2000');
      await expect(page.locator('#notification')).toHaveText('not received');
    });

    test('It should be an error selecting not image on icon setting', async ({
      page,
    }) => {
      await page.getByRole('button', { name: 'Icon Setting' }).click();
      await expect(page).toHaveTitle(/Setting Icon/);

      await page
        .getByLabel('Image')
        .setInputFiles(path.join(__dirname, '..', 'assets', 'dummy.txt'));
      await page.getByLabel('Zoom').focus();

      await expect(page.locator('#icon ~ .invalid-feedback')).toHaveText(
        'Please select an image file.',
      );
    });

    test('It should be an error selecting over 10KB file on icon setting', async ({
      page,
    }) => {
      await page.getByRole('button', { name: 'Icon Setting' }).click();
      await expect(page).toHaveTitle(/Setting Icon/);

      await page
        .getByLabel('Image')
        .setInputFiles(path.join(__dirname, '..', 'assets', '240x240_12.png'));
      await page.getByLabel('Zoom').focus();

      await expect(page.locator('#icon ~ .invalid-feedback')).toHaveText(
        'Please select a file with a size of 10 KB or less.',
      );
    });

    test('It should be display icon image', async ({ page }) => {
      await page.getByRole('button', { name: 'Icon Setting' }).click();
      await expect(page).toHaveTitle(/Setting Icon/);

      await page
        .getByLabel('Image')
        .setInputFiles(path.join(__dirname, '..', 'assets', '240x240_01.png'));
      await page.getByLabel('Zoom').focus();
      await page.getByLabel('Zoom').fill('80');
      await page.getByLabel('Border Color').fill('#000000');
      await page.getByRole('button', { name: 'submit' }).click();
      await expect(page).toHaveTitle(/MyPage/);

      await expect(page.locator('#icon-holder > img')).toBeVisible();
      await expect(page.locator('#icon-holder > img')).toHaveCSS(
        'width',
        '80px',
      );
      await expect(page.locator('#icon-holder > img')).toHaveCSS(
        'background-color',
        'rgb(0, 0, 0)',
      );
    });

    test('it should delete new user', async ({ page }) => {
      let count = 0;
      page.on('dialog', async (dialog) => {
        if (count === 0) {
          expect(dialog.message()).toBe(
            'If you cancel your membership, all information will be deleted.\nDo you wish to proceed?',
          );
          await dialog.accept();
          count++;
        } else if (count === 1) {
          expect(dialog.message()).toBe(
            'The process has been completed. Thank you for your service.',
          );
          await dialog.accept();
          count++;
        }
      });
      await page.getByRole('button', { name: 'Delete Account' }).click();

      await expect(page).toHaveURL(/index\.html/);
    });
  });
});
