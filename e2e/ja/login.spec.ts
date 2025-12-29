import { test, expect } from '@playwright/test';

test.describe('ログイン', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ja/');
    await expect(page).toHaveTitle(
      'HOTEL PLANISPHERE - テスト自動化練習サイト',
    );
    await page.getByRole('button', { name: 'ログイン' }).click();
    await expect(page).toHaveTitle(/ログイン/);
  });

  test('定義済みユーザでログインができること', async ({ page }) => {
    await page.getByLabel('メールアドレス').fill('ichiro@example.com');
    await page.getByLabel('パスワード').fill('password');
    await page.getByRole('button', { name: 'ログイン' }).nth(1).click();

    await expect(page).toHaveTitle(/マイページ/);
    await expect(page.getByRole('heading', { level: 2 })).toHaveText(
      'マイページ',
    );
  });

  test('未入力でエラーとなること', async ({ page }) => {
    await page.getByLabel('メールアドレス').fill('');
    await page.getByLabel('パスワード').fill('');
    await page.getByRole('button', { name: 'ログイン' }).nth(1).click();

    await expect(page.locator('#email-message')).toHaveText(
      'このフィールドを入力してください。',
    );
    await expect(page.locator('#password-message')).toHaveText(
      'このフィールドを入力してください。',
    );
  });

  test('未登録のユーザでエラーとなること', async ({ page }) => {
    await page.getByLabel('メールアドレス').fill('error@example.com');
    await page.getByLabel('パスワード').fill('error');
    await page.getByRole('button', { name: 'ログイン' }).nth(1).click();

    await expect(page.locator('#email-message')).toHaveText(
      'メールアドレスまたはパスワードが違います。',
    );
    await expect(page.locator('#password-message')).toHaveText(
      'メールアドレスまたはパスワードが違います。',
    );
  });
});
