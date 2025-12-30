import path from 'node:path';
import { test, expect } from '@playwright/test';

test.describe('マイページ', () => {
  test.describe('定義済みユーザ', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/ja/');
      await expect(page).toHaveTitle(
        'HOTEL PLANISPHERE - テスト自動化練習サイト',
      );
      await page.getByRole('button', { name: 'ログイン' }).click();
      await expect(page).toHaveTitle(/ログイン/);
    });

    test('定義済みユーザの情報が表示されること_ichiro', async ({ page }) => {
      await page.getByLabel('メールアドレス').fill('ichiro@example.com');
      await page.getByLabel('パスワード').fill('password');
      await page.getByRole('button', { name: 'ログイン' }).last().click();
      await expect(page).toHaveTitle(/マイページ/);

      await expect(page.locator('#email')).toHaveText('ichiro@example.com');
      await expect(page.locator('#username')).toHaveText('山田一郎');
      await expect(page.locator('#rank')).toHaveText('プレミアム会員');
      await expect(page.locator('#address')).toHaveText('東京都豊島区池袋');
      await expect(page.locator('#tel')).toHaveText('01234567891');
      await expect(page.locator('#gender')).toHaveText('男性');
      await expect(page.locator('#birthday')).toHaveText('未登録');
      await expect(page.locator('#notification')).toHaveText('受け取る');
    });

    test('定義済みユーザの情報が表示されること_sakura', async ({ page }) => {
      await page.getByLabel('メールアドレス').fill('sakura@example.com');
      await page.getByLabel('パスワード').fill('pass1234');
      await page.getByRole('button', { name: 'ログイン' }).last().click();
      await expect(page).toHaveTitle(/マイページ/);

      await expect(page.locator('#email')).toHaveText('sakura@example.com');
      await expect(page.locator('#username')).toHaveText('松本さくら');
      await expect(page.locator('#rank')).toHaveText('一般会員');
      await expect(page.locator('#address')).toHaveText(
        '神奈川県横浜市鶴見区大黒ふ頭',
      );
      await expect(page.locator('#tel')).toHaveText('未登録');
      await expect(page.locator('#gender')).toHaveText('女性');
      await expect(page.locator('#birthday')).toHaveText('2000年4月1日');
      await expect(page.locator('#notification')).toHaveText('受け取らない');
    });

    test('定義済みユーザの情報が表示されること_jun', async ({ page }) => {
      await page.getByLabel('メールアドレス').fill('jun@example.com');
      await page.getByLabel('パスワード').fill('pa55w0rd!');
      await page.getByRole('button', { name: 'ログイン' }).last().click();
      await expect(page).toHaveTitle(/マイページ/);

      await expect(page.locator('#email')).toHaveText('jun@example.com');
      await expect(page.locator('#username')).toHaveText('林潤');
      await expect(page.locator('#rank')).toHaveText('プレミアム会員');
      await expect(page.locator('#address')).toHaveText('大阪府大阪市北区梅田');
      await expect(page.locator('#tel')).toHaveText('01212341234');
      await expect(page.locator('#gender')).toHaveText('その他');
      await expect(page.locator('#birthday')).toHaveText('1988年12月17日');
      await expect(page.locator('#notification')).toHaveText('受け取らない');
    });

    test('定義済みユーザの情報が表示されること_yoshiki', async ({ page }) => {
      await page.getByLabel('メールアドレス').fill('yoshiki@example.com');
      await page.getByLabel('パスワード').fill('pass-pass');
      await page.getByRole('button', { name: 'ログイン' }).last().click();
      await expect(page).toHaveTitle(/マイページ/);

      await expect(page.locator('#email')).toHaveText('yoshiki@example.com');
      await expect(page.locator('#username')).toHaveText('木村良樹');
      await expect(page.locator('#rank')).toHaveText('一般会員');
      await expect(page.locator('#address')).toHaveText('未登録');
      await expect(page.locator('#tel')).toHaveText('01298765432');
      await expect(page.locator('#gender')).toHaveText('未登録');
      await expect(page.locator('#birthday')).toHaveText('1992年8月31日');
      await expect(page.locator('#notification')).toHaveText('受け取る');
    });
  });

  test.describe('新規登録ユーザ', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/ja/');
      await expect(page).toHaveTitle(
        'HOTEL PLANISPHERE - テスト自動化練習サイト',
      );
      await page.getByRole('link', { name: '会員登録' }).click();
      await expect(page).toHaveTitle(/会員登録/);
      await page.getByLabel('メールアドレス 必須').fill('new-user@example.com');
      await page.getByLabel('パスワード 必須').fill('11111111');
      await page.getByLabel('パスワード（確認） 必須').fill('11111111');
      await page.getByLabel('氏名 必須').fill('田中花子');
      await page.getByLabel('一般会員').check();
      await page.getByLabel('住所').fill('神奈川県横浜市港区');
      await page.getByLabel('電話番号').fill('09876543211');
      await page.getByLabel('性別').selectOption({ label: '女性' });
      await page.getByLabel('生年月日').fill('2000-01-01');
      await page.getByLabel('お知らせを受け取る').setChecked(false);
      await page.getByRole('button', { name: '登録' }).click();

      await expect(page).toHaveTitle(/マイページ/);
      await expect(page.getByRole('heading', { level: 2 })).toHaveText(
        'マイページ',
      );
    });

    test('新規登録したユーザの情報が表示されること', async ({ page }) => {
      await expect(page.locator('#email')).toHaveText('new-user@example.com');
      await expect(page.locator('#username')).toHaveText('田中花子');
      await expect(page.locator('#rank')).toHaveText('一般会員');
      await expect(page.locator('#address')).toHaveText('神奈川県横浜市港区');
      await expect(page.locator('#tel')).toHaveText('09876543211');
      await expect(page.locator('#gender')).toHaveText('女性');
      await expect(page.locator('#birthday')).toHaveText('2000年1月1日');
      await expect(page.locator('#notification')).toHaveText('受け取らない');
    });

    test('アイコン設定で画像以外のファイルはエラーとなること', async ({
      page,
    }) => {
      await page.getByRole('button', { name: 'アイコン設定' }).click();
      await expect(page).toHaveTitle(/アイコン設定/);

      await page
        .getByLabel('アイコン画像')
        .setInputFiles(path.join(__dirname, '..', 'assets', 'dummy.txt'));
      await page.getByLabel('拡大・縮小').focus();

      await expect(page.locator('#icon ~ .invalid-feedback')).toHaveText(
        '画像ファイルを選択してください。',
      );
    });

    test('アイコン設定で10KBを越えるファイルはエラーとなること', async ({
      page,
    }) => {
      await page.getByRole('button', { name: 'アイコン設定' }).click();
      await expect(page).toHaveTitle(/アイコン設定/);

      await page
        .getByLabel('アイコン画像')
        .setInputFiles(path.join(__dirname, '..', 'assets', '240x240_12.png'));
      await page.getByLabel('拡大・縮小').focus();

      await expect(page.locator('#icon ~ .invalid-feedback')).toHaveText(
        'ファイルサイズは10KB以下にしてください。',
      );
    });

    test('設定したアイコンがマイページに表示されること', async ({ page }) => {
      await page.getByRole('button', { name: 'アイコン設定' }).click();
      await expect(page).toHaveTitle(/アイコン設定/);

      await page
        .getByLabel('アイコン画像')
        .setInputFiles(path.join(__dirname, '..', 'assets', '240x240_01.png'));
      await page.getByLabel('拡大・縮小').focus();
      await page.getByLabel('拡大・縮小').fill('80');
      await page.getByLabel('枠線の色').fill('#000000');
      await page.getByRole('button', { name: '確定' }).click();
      await expect(page).toHaveTitle(/マイページ/);

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

    test('新規登録したユーザが削除できること', async ({ page }) => {
      let count = 0;
      page.on('dialog', async (dialog) => {
        if (count === 0) {
          expect(dialog.message()).toBe(
            '退会すると全ての情報が削除されます。\nよろしいですか？',
          );
          await dialog.accept();
          count++;
        } else if (count === 1) {
          expect(dialog.message()).toBe(
            '退会処理を完了しました。ご利用ありがとうございました。',
          );
          await dialog.accept();
          count++;
        }
      });
      await page.getByRole('button', { name: '退会する' }).click();

      await expect(page).toHaveURL(/index\.html/);
    });
  });
});
