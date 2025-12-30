import { test, expect } from '@playwright/test';

test.describe('リダイレクト', () => {
  const BASE_URL_LOCALE = '/ja';

  test('未ログインでマイページからトップへリダイレクトすること', async ({
    page,
  }) => {
    await page.goto(`${BASE_URL_LOCALE}/mypage.html`);
    await expect(page).toHaveURL(/index\.html$/);
  });

  test('ログイン済みでログイン画面からトップへリダイレクトすること', async ({
    page,
  }) => {
    await page.goto(`${BASE_URL_LOCALE}/`);
    await expect(page).toHaveTitle(
      'HOTEL PLANISPHERE - テスト自動化練習サイト',
    );
    await page.getByRole('button', { name: 'ログイン' }).click();
    await expect(page).toHaveTitle(/ログイン/);
    await page.getByLabel('メールアドレス').fill('ichiro@example.com');
    await page.getByLabel('パスワード').fill('password');
    await page.getByRole('button', { name: 'ログイン' }).last().click();
    await expect(page).toHaveTitle(/マイページ/);

    await page.goto(`${BASE_URL_LOCALE}/login.html`);
    await expect(page).toHaveURL(/index\.html$/);
  });

  test('ログイン済みで登録画面からトップへリダイレクトすること', async ({
    page,
  }) => {
    await page.goto(`${BASE_URL_LOCALE}/`);
    await expect(page).toHaveTitle(
      'HOTEL PLANISPHERE - テスト自動化練習サイト',
    );
    await page.getByRole('button', { name: 'ログイン' }).click();
    await expect(page).toHaveTitle(/ログイン/);
    await page.getByLabel('メールアドレス').fill('ichiro@example.com');
    await page.getByLabel('パスワード').fill('password');
    await page.getByRole('button', { name: 'ログイン' }).last().click();
    await expect(page).toHaveTitle(/マイページ/);

    await page.goto(`${BASE_URL_LOCALE}/signup.html`);
    await expect(page).toHaveURL(/index\.html$/);
  });

  test('存在しないプランIDでトップへリダイレクトすること', async ({ page }) => {
    await page.goto(`${BASE_URL_LOCALE}/reserve.html?plan-id=100`);
    await expect(page).toHaveURL(/index\.html$/);
  });

  test('不正なプランIDでトップへリダイレクトすること1', async ({ page }) => {
    await page.goto(`${BASE_URL_LOCALE}/reserve.html?plan-id=abc`);
    await expect(page).toHaveURL(/index\.html$/);
  });

  test('不正なプランIDでトップへリダイレクトすること2', async ({ page }) => {
    await page.goto(`${BASE_URL_LOCALE}/reserve.html`);
    await expect(page).toHaveURL(/index\.html$/);
  });

  test('未ログインで会員専用プランでトップへリダイレクトすること', async ({
    page,
  }) => {
    await page.goto(`${BASE_URL_LOCALE}/reserve.html?plan-id=3`);
    await expect(page).toHaveURL(/index\.html$/);
  });

  test('未ログインでプレミアム専用プランでトップへリダイレクトすること', async ({
    page,
  }) => {
    await page.goto(`${BASE_URL_LOCALE}/reserve.html?plan-id=1`);
    await expect(page).toHaveURL(/index\.html$/);
  });

  test('一般会員でプレミアム専用プランでトップへリダイレクトすること', async ({
    page,
  }) => {
    await page.goto(`${BASE_URL_LOCALE}/`);
    await expect(page).toHaveTitle(
      'HOTEL PLANISPHERE - テスト自動化練習サイト',
    );
    await page.getByRole('button', { name: 'ログイン' }).click();
    await expect(page).toHaveTitle(/ログイン/);
    await page.getByLabel('メールアドレス').fill('sakura@example.com');
    await page.getByLabel('パスワード').fill('pass1234');
    await page.getByRole('button', { name: 'ログイン' }).last().click();
    await expect(page).toHaveTitle(/マイページ/);

    await page.goto(`${BASE_URL_LOCALE}/reserve.html?plan-id=1`);
    await expect(page).toHaveURL(/index\.html$/);
  });

  test('予約画面を経ずに確認画面でトップへリダイレクトすること', async ({
    page,
  }) => {
    await page.goto(`${BASE_URL_LOCALE}/confirm.html`);
    await expect(page).toHaveURL(/index\.html$/);
  });
});
