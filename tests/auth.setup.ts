import { test as setup, expect } from '@playwright/test';
import dotenv from 'dotenv';

const authFile = 'playwright/.auth/user.json';

dotenv.config();

setup('認証', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('https://dev.kintai.virtualtech.jp/login');

  await page.getByPlaceholder('メールアドレスを入力').click();
  await page.getByPlaceholder('メールアドレスを入力').fill(process.env.USER_EMAIL!);

  await page.getByPlaceholder('パスワードを入力').click();
  await page.getByPlaceholder('パスワードを入力').fill(process.env.USER_PASSWORD!);

  await page.getByRole('button', { name: 'ログイン' }).click();

  await page.waitForURL('https://dev.kintai.virtualtech.jp/');

  await expect(page.getByRole('heading', { name: '出勤前' })).toBeVisible();

  await page.context().storageState({ path: authFile });
});