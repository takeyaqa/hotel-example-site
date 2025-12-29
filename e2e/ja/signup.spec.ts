import { test, expect } from '@playwright/test';

test.describe('会員登録', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ja/');
    await expect(page).toHaveTitle(
      'HOTEL PLANISPHERE - テスト自動化練習サイト',
    );
    await page.getByRole('link', { name: '会員登録' }).click();
    await expect(page).toHaveTitle(/会員登録/);
  });

  test('ユーザの新規登録ができること', async ({ page }) => {
    await page.getByLabel('メールアドレス 必須').fill('new-user@example.com');
    await page.getByLabel('パスワード 必須').fill('password');
    await page.getByLabel('パスワード（確認） 必須').fill('password');
    await page.getByLabel('氏名 必須').fill('新規ユーザ１');
    await page.getByLabel('一般会員').check();
    await page.getByLabel('住所').fill('神奈川県横浜市港区');
    await page.getByLabel('電話番号').fill('01234567891');
    await page.getByLabel('性別').selectOption({ label: '女性' });
    await page.getByLabel('生年月日').fill('2000-01-01');
    await page.getByLabel('お知らせを受け取る').setChecked(true);
    await page.getByRole('button', { name: '登録' }).click();

    await expect(page).toHaveTitle(/マイページ/);
    await expect(page.getByRole('heading', { level: 2 })).toHaveText(
      'マイページ',
    );
  });

  test('必須項目を未入力にするとエラーとなること', async ({ page }) => {
    await page.getByLabel('メールアドレス 必須').fill('');
    await page.getByLabel('パスワード 必須').fill('');
    await page.getByLabel('パスワード（確認） 必須').fill('');
    await page.getByLabel('氏名 必須').fill('');
    await page.getByLabel('プレミアム会員').check();
    await page.getByLabel('住所').fill('');
    await page.getByLabel('電話番号').fill('');
    await page.getByLabel('性別').selectOption({ label: '回答しない' });
    await page.getByLabel('生年月日').fill('');
    await page.getByLabel('お知らせを受け取る').setChecked(false);
    await page.getByRole('button', { name: '登録' }).click();

    await expect(page.locator('#email ~ .invalid-feedback')).toHaveText(
      'このフィールドを入力してください。',
    );
    await expect(page.locator('#password ~ .invalid-feedback')).toHaveText(
      'このフィールドを入力してください。',
    );
    await expect(
      page.locator('#password-confirmation ~ .invalid-feedback'),
    ).toHaveText('このフィールドを入力してください。');
    await expect(page.locator('#username ~ .invalid-feedback')).toHaveText(
      'このフィールドを入力してください。',
    );
    await expect(page.locator('#address ~ .invalid-feedback')).toBeEmpty();
    await expect(page.locator('#tel ~ .invalid-feedback')).toBeEmpty();
    await expect(page.locator('#gender ~ .invalid-feedback')).toBeEmpty();
    await expect(page.locator('#birthday ~ .invalid-feedback')).toBeEmpty();
  });

  test('指定のフォーマット外の入力でエラーとなること', async ({ page }) => {
    await page.getByLabel('メールアドレス 必須').fill('a');
    await page.getByLabel('パスワード 必須').fill('1234567');
    await page.getByLabel('パスワード（確認） 必須').fill('1');
    await page.getByLabel('氏名 必須').fill('テストテスト');
    await page.getByLabel('一般会員').check();
    await page.getByLabel('住所').fill('千葉県千葉市');
    await page.getByLabel('電話番号').fill('1234567890');
    await page.getByLabel('性別').selectOption({ label: 'その他' });
    await page.getByLabel('生年月日').fill('2000-01-01');
    await page.getByLabel('お知らせを受け取る').setChecked(true);
    await page.getByRole('button', { name: '登録' }).click();

    await expect(page.locator('#email ~ .invalid-feedback')).toHaveText(
      'メールアドレスを入力してください。',
    );
    await expect(page.locator('#password ~ .invalid-feedback')).toHaveText(
      '8文字以上で入力してください。',
    );
    await expect(
      page.locator('#password-confirmation ~ .invalid-feedback'),
    ).toHaveText('8文字以上で入力してください。');
    await expect(page.locator('#username ~ .invalid-feedback')).toBeEmpty();
    await expect(page.locator('#address ~ .invalid-feedback')).toBeEmpty();
    await expect(page.locator('#tel ~ .invalid-feedback')).toHaveText(
      '指定されている形式で入力してください。',
    );
    await expect(page.locator('#gender ~ .invalid-feedback')).toBeEmpty();
    await expect(page.locator('#birthday ~ .invalid-feedback')).toBeEmpty();
  });

  test('登録済みのメールアドレスはエラーとなること', async ({ page }) => {
    await page.getByLabel('メールアドレス 必須').fill('new-user@example.com');
    await page.getByLabel('パスワード 必須').fill('password');
    await page.getByLabel('パスワード（確認） 必須').fill('password');
    await page.getByLabel('氏名 必須').fill('新規ユーザ１');
    await page.getByLabel('一般会員').check();
    await page.getByLabel('住所').fill('神奈川県横浜市港区');
    await page.getByLabel('電話番号').fill('01234567891');
    await page.getByLabel('性別').selectOption({ label: '女性' });
    await page.getByLabel('生年月日').fill('2000-01-01');
    await page.getByLabel('お知らせを受け取る').setChecked(true);
    await page.getByRole('button', { name: '登録' }).click();

    await expect(page).toHaveTitle(/マイページ/);
    await expect(page.getByRole('heading', { level: 2 })).toHaveText(
      'マイページ',
    );

    await page.getByRole('button', { name: 'ログアウト' }).click();
    await expect(page).toHaveTitle(
      'HOTEL PLANISPHERE - テスト自動化練習サイト',
    );
    await page.getByRole('link', { name: '会員登録' }).click();
    await expect(page).toHaveTitle(/会員登録/);

    await page.getByLabel('メールアドレス 必須').fill('new-user@example.com');
    await page.getByLabel('パスワード 必須').fill('password');
    await page.getByLabel('パスワード（確認） 必須').fill('password');
    await page.getByLabel('氏名 必須').fill('新規ユーザ１');
    await page.getByLabel('一般会員').check();
    await page.getByLabel('住所').fill('神奈川県横浜市港区');
    await page.getByLabel('電話番号').fill('01234567891');
    await page.getByLabel('性別').selectOption({ label: '女性' });
    await page.getByLabel('生年月日').fill('2000-01-01');
    await page.getByLabel('お知らせを受け取る').setChecked(true);
    await page.getByRole('button', { name: '登録' }).click();

    await expect(page.locator('#email ~ .invalid-feedback')).toHaveText(
      'このメールアドレスはすでに登録済みです。',
    );
  });

  test('入力パスワードが一致しないとエラーとなること', async ({ page }) => {
    await page.getByLabel('メールアドレス 必須').fill('');
    await page.getByLabel('パスワード 必須').fill('password');
    await page.getByLabel('パスワード（確認） 必須').fill('123456789');
    await page.getByLabel('氏名 必須').fill('新規ユーザ１');
    await page.getByLabel('一般会員').check();
    await page.getByLabel('住所').fill('神奈川県横浜市港区');
    await page.getByLabel('電話番号').fill('01234567891');
    await page.getByLabel('性別').selectOption({ label: '男性' });
    await page.getByLabel('生年月日').fill('2000-01-01');
    await page.getByLabel('お知らせを受け取る').setChecked(true);
    await page.getByRole('button', { name: '登録' }).click();

    await expect(
      page.locator('#password-confirmation ~ .invalid-feedback'),
    ).toHaveText('入力されたパスワードと一致しません。');
  });
});
