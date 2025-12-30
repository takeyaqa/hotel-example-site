import { test, expect } from '@playwright/test';

test.describe('プラン一覧', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ja/');
    await expect(page).toHaveTitle(
      'HOTEL PLANISPHERE - テスト自動化練習サイト',
    );
  });

  test('未ログイン状態でプラン一覧が表示されること', async ({ page }) => {
    await page.getByRole('link', { name: '宿泊予約' }).click();
    await expect(page).toHaveTitle(/宿泊プラン一覧/);

    await expect(page.getByRole('status')).toBeHidden();
    await expect(page.getByRole('heading', { level: 5 })).toHaveText([
      'お得な特典付きプラン',
      '素泊まり',
      '出張ビジネスプラン',
      'エステ・マッサージプラン',
      '貸し切り露天風呂プラン',
      'カップル限定プラン',
      'テーマパーク優待プラン',
    ]);
  });

  test('一般会員でログイン状態でプラン一覧が表示されること', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'ログイン' }).click();
    await expect(page).toHaveTitle(/ログイン/);

    await page.getByLabel('メールアドレス').fill('sakura@example.com');
    await page.getByLabel('パスワード').fill('pass1234');
    await page.getByRole('button', { name: 'ログイン' }).last().click();
    await expect(page).toHaveTitle(/マイページ/);

    await page.getByRole('link', { name: '宿泊予約' }).click();
    await expect(page).toHaveTitle(/宿泊プラン一覧/);

    await expect(page.getByRole('status')).toBeHidden();
    await expect(page.getByRole('heading', { level: 5 })).toHaveText([
      'お得な特典付きプラン',
      'ディナー付きプラン',
      'お得なプラン',
      '素泊まり',
      '出張ビジネスプラン',
      'エステ・マッサージプラン',
      '貸し切り露天風呂プラン',
      'カップル限定プラン',
      'テーマパーク優待プラン',
    ]);
  });

  test('プレミアム会員でログイン状態でプラン一覧が表示されること', async ({
    page,
  }) => {
    await page.getByRole('button', { name: 'ログイン' }).click();
    await expect(page).toHaveTitle(/ログイン/);

    await page.getByLabel('メールアドレス').fill('ichiro@example.com');
    await page.getByLabel('パスワード').fill('password');
    await page.getByRole('button', { name: 'ログイン' }).last().click();
    await expect(page).toHaveTitle(/マイページ/);

    await page.getByRole('link', { name: '宿泊予約' }).click();
    await expect(page).toHaveTitle(/宿泊プラン一覧/);

    await expect(page.getByRole('status')).toBeHidden();
    await expect(page.getByRole('heading', { level: 5 })).toHaveText([
      'お得な特典付きプラン',
      'プレミアムプラン',
      'ディナー付きプラン',
      'お得なプラン',
      '素泊まり',
      '出張ビジネスプラン',
      'エステ・マッサージプラン',
      '貸し切り露天風呂プラン',
      'カップル限定プラン',
      'テーマパーク優待プラン',
    ]);
  });
});
