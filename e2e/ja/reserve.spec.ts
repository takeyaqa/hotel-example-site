import { test, expect } from '@playwright/test';

const formatShort = (date: Date) =>
  `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
const formatLong = (date: Date) =>
  `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;

test.describe('宿泊予約', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ja/');
    await expect(page).toHaveTitle(
      'HOTEL PLANISPHERE - テスト自動化練習サイト',
    );
  });

  test('画面表示時の初期値が設定されていること_未ログイン', async ({
    page,
  }) => {
    await page.getByRole('link', { name: '宿泊予約' }).click();
    await expect(page).toHaveTitle(/宿泊プラン一覧/);

    await expect(page.getByRole('status')).toBeHidden();
    const [reservePage] = await Promise.all([
      page.waitForEvent('popup'),
      page
        .locator('.card')
        .filter({
          has: page.getByRole('heading', {
            level: 5,
            name: 'お得な特典付きプラン',
          }),
        })
        .first()
        .getByRole('link', { name: 'このプランで予約' })
        .click(),
    ]);

    const tomorrow = formatShort(new Date(Date.now() + 24 * 60 * 60 * 1000));

    await expect(reservePage).toHaveTitle(/宿泊予約/);
    await expect(reservePage.getByRole('heading', { level: 4 })).toHaveText(
      'お得な特典付きプラン',
    );
    await expect(reservePage.getByLabel('宿泊日 必須')).toHaveValue(tomorrow);
    await expect(reservePage.getByLabel('宿泊数 必須')).toHaveValue('1');
    await expect(reservePage.getByLabel('人数 必須')).toHaveValue('1');
    await expect(reservePage.getByLabel('メールアドレス 必須')).toBeHidden();
    await expect(reservePage.getByLabel('電話番号 必須')).toBeHidden();

    await reservePage
      .getByLabel('確認のご連絡 必須')
      .selectOption({ label: 'メールでのご連絡' });
    await expect(reservePage.getByLabel('メールアドレス 必須')).toBeVisible();
    await expect(reservePage.getByLabel('電話番号 必須')).toBeHidden();

    await reservePage
      .getByLabel('確認のご連絡 必須')
      .selectOption({ label: '電話でのご連絡' });
    await expect(reservePage.getByLabel('メールアドレス 必須')).toBeHidden();
    await expect(reservePage.getByLabel('電話番号 必須')).toBeVisible();

    await expect(
      reservePage
        .frameLocator('iframe[name="room"]')
        .getByRole('heading', { level: 5 }),
    ).toHaveText('スタンダードツイン');
  });

  test('画面表示時の初期値が設定されていること_ログイン済み', async ({
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
    const [reservePage] = await Promise.all([
      page.waitForEvent('popup'),
      page
        .locator('.card')
        .filter({
          has: page.getByRole('heading', {
            level: 5,
            name: 'プレミアムプラン',
          }),
        })
        .first()
        .getByRole('link', { name: 'このプランで予約' })
        .click(),
    ]);

    const tomorrow = formatShort(new Date(Date.now() + 24 * 60 * 60 * 1000));

    await expect(reservePage).toHaveTitle(/宿泊予約/);
    await expect(reservePage.getByRole('heading', { level: 4 })).toHaveText(
      'プレミアムプラン',
    );
    await expect(reservePage.getByLabel('宿泊日 必須')).toHaveValue(tomorrow);
    await expect(reservePage.getByLabel('宿泊数 必須')).toHaveValue('1');
    await expect(reservePage.getByLabel('人数 必須')).toHaveValue('2');
    await expect(reservePage.getByLabel('氏名 必須')).toHaveValue('山田一郎');

    await reservePage
      .getByLabel('確認のご連絡 必須')
      .selectOption({ label: 'メールでのご連絡' });
    await expect(reservePage.getByLabel('メールアドレス 必須')).toHaveValue(
      'ichiro@example.com',
    );

    await reservePage
      .getByLabel('確認のご連絡 必須')
      .selectOption({ label: '電話でのご連絡' });
    await expect(reservePage.getByLabel('電話番号 必須')).toHaveValue(
      '01234567891',
    );

    await expect(
      reservePage
        .frameLocator('iframe[name="room"]')
        .getByRole('heading', { level: 5 }),
    ).toHaveText('プレミアムツイン');
  });

  test('入力値が空白でエラーとなること', async ({ page }) => {
    await page.getByRole('link', { name: '宿泊予約' }).click();
    await expect(page).toHaveTitle(/宿泊プラン一覧/);

    await expect(page.getByRole('status')).toBeHidden();
    const [reservePage] = await Promise.all([
      page.waitForEvent('popup'),
      page
        .locator('.card')
        .filter({
          has: page.getByRole('heading', {
            level: 5,
            name: 'お得な特典付きプラン',
          }),
        })
        .first()
        .getByRole('link', { name: 'このプランで予約' })
        .click(),
    ]);

    await expect(reservePage).toHaveTitle(/宿泊予約/);
    await expect(reservePage.getByRole('heading', { level: 4 })).toHaveText(
      'お得な特典付きプラン',
    );

    await reservePage.getByLabel('宿泊日 必須').fill('');
    await reservePage.getByLabel('宿泊数 必須').fill('');
    await reservePage.getByLabel('人数 必須').fill('');
    await reservePage.getByLabel('氏名 必須').focus();

    await expect(reservePage.locator('#date ~ .invalid-feedback')).toHaveText(
      'このフィールドを入力してください。',
    );
    await expect(reservePage.locator('#term ~ .invalid-feedback')).toHaveText(
      'このフィールドを入力してください。',
    );
    await expect(
      reservePage.locator('#head-count ~ .invalid-feedback'),
    ).toHaveText('このフィールドを入力してください。');
  });

  test('不正な入力値でエラーとなること_小', async ({ page }) => {
    await page.getByRole('link', { name: '宿泊予約' }).click();
    await expect(page).toHaveTitle(/宿泊プラン一覧/);

    await expect(page.getByRole('status')).toBeHidden();
    const [reservePage] = await Promise.all([
      page.waitForEvent('popup'),
      page
        .locator('.card')
        .filter({
          has: page.getByRole('heading', {
            level: 5,
            name: 'お得な特典付きプラン',
          }),
        })
        .first()
        .getByRole('link', { name: 'このプランで予約' })
        .click(),
    ]);

    await expect(reservePage).toHaveTitle(/宿泊予約/);
    await expect(reservePage.getByRole('heading', { level: 4 })).toHaveText(
      'お得な特典付きプラン',
    );

    const today = formatShort(new Date());

    await reservePage.getByLabel('宿泊日 必須').fill(today);
    await reservePage.getByLabel('宿泊数 必須').fill('0');
    await reservePage.getByLabel('人数 必須').fill('0');
    await reservePage.getByLabel('氏名 必須').fill('テスト太郎');

    await expect(reservePage.locator('#date ~ .invalid-feedback')).toHaveText(
      '翌日以降の日付を入力してください。',
    );
    await expect(reservePage.locator('#term ~ .invalid-feedback')).toHaveText(
      '1以上の値を入力してください。',
    );
    await expect(
      reservePage.locator('#head-count ~ .invalid-feedback'),
    ).toHaveText('1以上の値を入力してください。');
  });

  test('不正な入力値でエラーとなること_大', async ({ page }) => {
    await page.getByRole('link', { name: '宿泊予約' }).click();
    await expect(page).toHaveTitle(/宿泊プラン一覧/);

    await expect(page.getByRole('status')).toBeHidden();
    const [reservePage] = await Promise.all([
      page.waitForEvent('popup'),
      page
        .locator('.card')
        .filter({
          has: page.getByRole('heading', {
            level: 5,
            name: 'お得な特典付きプラン',
          }),
        })
        .first()
        .getByRole('link', { name: 'このプランで予約' })
        .click(),
    ]);

    await expect(reservePage).toHaveTitle(/宿泊予約/);
    await expect(reservePage.getByRole('heading', { level: 4 })).toHaveText(
      'お得な特典付きプラン',
    );

    const after90 = new Date();
    after90.setDate(after90.getDate() + 91);

    await reservePage.getByLabel('宿泊日 必須').fill(formatShort(after90));
    await reservePage.getByLabel('宿泊数 必須').fill('10');
    await reservePage.getByLabel('人数 必須').fill('10');
    await reservePage.getByLabel('氏名 必須').fill('テスト太郎');

    await expect(reservePage.locator('#date ~ .invalid-feedback')).toHaveText(
      '3ヶ月以内の日付を入力してください。',
    );
    await expect(reservePage.locator('#term ~ .invalid-feedback')).toHaveText(
      '9以下の値を入力してください。',
    );
    await expect(
      reservePage.locator('#head-count ~ .invalid-feedback'),
    ).toHaveText('9以下の値を入力してください。');
  });

  test('不正な入力値でエラーとなること_文字列', async ({ page }) => {
    await page.getByRole('link', { name: '宿泊予約' }).click();
    await expect(page).toHaveTitle(/宿泊プラン一覧/);

    await expect(page.getByRole('status')).toBeHidden();
    const [reservePage] = await Promise.all([
      page.waitForEvent('popup'),
      page
        .locator('.card')
        .filter({
          has: page.getByRole('heading', {
            level: 5,
            name: 'お得な特典付きプラン',
          }),
        })
        .first()
        .getByRole('link', { name: 'このプランで予約' })
        .click(),
    ]);

    await expect(reservePage).toHaveTitle(/宿泊予約/);
    await expect(reservePage.getByRole('heading', { level: 4 })).toHaveText(
      'お得な特典付きプラン',
    );

    const after90 = new Date();
    after90.setDate(after90.getDate() + 91);

    await reservePage.getByLabel('宿泊日 必須').fill('12/3//345');
    await reservePage.getByLabel('氏名 必須').fill('テスト太郎');

    await expect(reservePage.locator('#date ~ .invalid-feedback')).toHaveText(
      '有効な値を入力してください。',
    );
  });

  test('不正な入力値でエラーとなること_確定時_メール選択', async ({ page }) => {
    await page.getByRole('link', { name: '宿泊予約' }).click();
    await expect(page).toHaveTitle(/宿泊プラン一覧/);

    await expect(page.getByRole('status')).toBeHidden();
    const [reservePage] = await Promise.all([
      page.waitForEvent('popup'),
      page
        .locator('.card')
        .filter({
          has: page.getByRole('heading', {
            level: 5,
            name: 'お得な特典付きプラン',
          }),
        })
        .first()
        .getByRole('link', { name: 'このプランで予約' })
        .click(),
    ]);

    await expect(reservePage).toHaveTitle(/宿泊予約/);
    await expect(reservePage.getByRole('heading', { level: 4 })).toHaveText(
      'お得な特典付きプラン',
    );

    await reservePage.getByLabel('氏名 必須').fill('');
    await reservePage
      .getByLabel('確認のご連絡 必須')
      .selectOption({ label: 'メールでのご連絡' });
    await reservePage.getByLabel('メールアドレス 必須').fill('');
    await reservePage
      .getByRole('button', { name: '予約内容を確認する' })
      .click();

    await expect(
      reservePage.locator('#username ~ .invalid-feedback'),
    ).toHaveText('このフィールドを入力してください。');
    await expect(reservePage.locator('#email ~ .invalid-feedback')).toHaveText(
      'このフィールドを入力してください。',
    );
  });

  test('不正な入力値でエラーとなること_確定時_電話選択', async ({ page }) => {
    await page.getByRole('link', { name: '宿泊予約' }).click();
    await expect(page).toHaveTitle(/宿泊プラン一覧/);

    await expect(page.getByRole('status')).toBeHidden();
    const [reservePage] = await Promise.all([
      page.waitForEvent('popup'),
      page
        .locator('.card')
        .filter({
          has: page.getByRole('heading', {
            level: 5,
            name: 'お得な特典付きプラン',
          }),
        })
        .first()
        .getByRole('link', { name: 'このプランで予約' })
        .click(),
    ]);

    await expect(reservePage).toHaveTitle(/宿泊予約/);
    await expect(reservePage.getByRole('heading', { level: 4 })).toHaveText(
      'お得な特典付きプラン',
    );

    await reservePage.getByLabel('氏名 必須').fill('');
    await reservePage
      .getByLabel('確認のご連絡 必須')
      .selectOption({ label: '電話でのご連絡' });
    await reservePage.getByLabel('電話番号 必須').fill('');
    await reservePage
      .getByRole('button', { name: '予約内容を確認する' })
      .click();

    await expect(
      reservePage.locator('#username ~ .invalid-feedback'),
    ).toHaveText('このフィールドを入力してください。');
    await expect(reservePage.locator('#tel ~ .invalid-feedback')).toHaveText(
      'このフィールドを入力してください。',
    );
  });

  test('宿泊予約が完了すること_未ログイン_初期値', async ({ page }) => {
    await page.getByRole('link', { name: '宿泊予約' }).click();
    await expect(page).toHaveTitle(/宿泊プラン一覧/);

    await expect(page.getByRole('status')).toBeHidden();
    const [reservePage] = await Promise.all([
      page.waitForEvent('popup'),
      page
        .locator('.card')
        .filter({
          has: page.getByRole('heading', {
            level: 5,
            name: 'お得な特典付きプラン',
          }),
        })
        .first()
        .getByRole('link', { name: 'このプランで予約' })
        .click(),
    ]);

    await expect(reservePage).toHaveTitle(/宿泊予約/);
    await expect(reservePage.getByRole('heading', { level: 4 })).toHaveText(
      'お得な特典付きプラン',
    );

    const expectedStart = new Date();
    expectedStart.setDate(expectedStart.getDate() + 1);
    const expectedEnd = new Date(expectedStart);
    expectedEnd.setDate(expectedEnd.getDate() + 1);
    const day = expectedStart.getDay();
    const weekend = day === 0 || day === 6;
    const expectedTotalBill = weekend
      ? '合計 8,750円（税込み）'
      : '合計 7,000円（税込み）';
    const expectedTerm = `${formatLong(expectedStart)} 〜 ${formatLong(expectedEnd)} 1泊`;

    await reservePage.getByLabel('氏名 必須').fill('テスト太郎');
    await reservePage
      .getByLabel('確認のご連絡 必須')
      .selectOption({ label: '希望しない' });
    await reservePage
      .getByRole('button', { name: '予約内容を確認する' })
      .click();
    await expect(reservePage).toHaveTitle(/宿泊予約確認/);

    await expect(reservePage.locator('#total-bill')).toHaveText(
      expectedTotalBill,
    );
    await expect(reservePage.locator('#plan-name')).toHaveText(
      'お得な特典付きプラン',
    );
    await expect(reservePage.locator('#term')).toHaveText(expectedTerm);
    await expect(reservePage.locator('#head-count')).toHaveText('1名様');
    await expect(reservePage.locator('#plans')).toHaveText('なし');
    await expect(reservePage.locator('#username')).toHaveText('テスト太郎様');
    await expect(reservePage.locator('#contact')).toHaveText('希望しない');
    await expect(reservePage.locator('#comment')).toHaveText('なし');

    await reservePage
      .getByRole('button', { name: 'この内容で予約する' })
      .click();
    await expect(
      reservePage.locator('#success-modal > div > div > .modal-body'),
    ).toHaveText('ご来館、心よりお待ちしております。');
    await Promise.all([
      reservePage.waitForEvent('close'),
      reservePage
        .locator('#success-modal > div > div > div > button.btn-success')
        .click(),
    ]);
    expect(reservePage.isClosed()).toBeTruthy();
  });

  test('宿泊予約が完了すること_ログイン', async ({ page }) => {
    await page.getByRole('button', { name: 'ログイン' }).click();
    await expect(page).toHaveTitle(/ログイン/);

    await page.getByLabel('メールアドレス').fill('ichiro@example.com');
    await page.getByLabel('パスワード').fill('password');
    await page.getByRole('button', { name: 'ログイン' }).last().click();
    await expect(page).toHaveTitle(/マイページ/);

    await page.getByRole('link', { name: '宿泊予約' }).click();
    await expect(page).toHaveTitle(/宿泊プラン一覧/);

    await expect(page.getByRole('status')).toBeHidden();
    const [reservePage] = await Promise.all([
      page.waitForEvent('popup'),
      page
        .locator('.card')
        .filter({
          has: page.getByRole('heading', {
            level: 5,
            name: 'プレミアムプラン',
          }),
        })
        .first()
        .getByRole('link', { name: 'このプランで予約' })
        .click(),
    ]);

    await expect(reservePage).toHaveTitle(/宿泊予約/);
    await expect(reservePage.getByRole('heading', { level: 4 })).toHaveText(
      'プレミアムプラン',
    );
    const expectedStart = new Date();
    expectedStart.setDate(expectedStart.getDate() + 90);
    const expectedEnd = new Date(expectedStart);
    expectedEnd.setDate(expectedEnd.getDate() + 2);
    const dow = expectedStart.getDay();
    const expectedTotalBill =
      dow === 6
        ? '合計 112,000円（税込み）'
        : dow === 0 || dow === 5
          ? '合計 102,000円（税込み）'
          : '合計 92,000円（税込み）';
    const expectedTerm = `${formatLong(expectedStart)} 〜 ${formatLong(expectedEnd)} 2泊`;

    await reservePage.getByLabel('宿泊数 必須').fill('2');
    await reservePage.getByLabel('人数 必須').fill('4');
    await reservePage.getByLabel('朝食バイキング').setChecked(true);
    await reservePage.getByLabel('昼からチェックインプラン').setChecked(true);
    await reservePage.getByLabel('お得な観光プラン').setChecked(false);
    await reservePage
      .getByLabel('確認のご連絡 必須')
      .selectOption({ label: 'メールでのご連絡' });
    await reservePage
      .getByLabel('ご要望・ご連絡事項等ありましたらご記入ください')
      .fill('あああ\n\nいいいいいいい\nうう');
    await reservePage
      .getByLabel('宿泊日 必須')
      .fill(formatShort(expectedStart));
    await reservePage
      .getByRole('button', { name: '予約内容を確認する' })
      .click();
    await expect(reservePage).toHaveTitle(/宿泊予約確認/);

    await expect(reservePage.locator('#total-bill')).toHaveText(
      expectedTotalBill,
    );
    await expect(reservePage.locator('#plan-name')).toHaveText(
      'プレミアムプラン',
    );
    await expect(reservePage.locator('#term')).toHaveText(expectedTerm);
    await expect(reservePage.locator('#head-count')).toHaveText('4名様');
    await expect(reservePage.locator('#plans')).toHaveText(/朝食バイキング/);
    await expect(reservePage.locator('#plans')).toHaveText(
      /昼からチェックインプラン/,
    );
    await expect(reservePage.locator('#plans')).not.toHaveText(
      /お得な観光プラン/,
    );
    await expect(reservePage.locator('#username')).toHaveText('山田一郎様');
    await expect(reservePage.locator('#contact')).toHaveText(
      'メール：ichiro@example.com',
    );
    await expect(reservePage.locator('#comment')).toHaveText(
      'あああ\n\nいいいいいいい\nうう',
    );

    await reservePage
      .getByRole('button', { name: 'この内容で予約する' })
      .click();
    await expect(
      reservePage.locator('#success-modal > div > div > .modal-body'),
    ).toHaveText('ご来館、心よりお待ちしております。');
    await Promise.all([
      reservePage.waitForEvent('close'),
      reservePage
        .locator('#success-modal > div > div > div > button.btn-success')
        .click(),
    ]);
    expect(reservePage.isClosed()).toBeTruthy();
  });
});
