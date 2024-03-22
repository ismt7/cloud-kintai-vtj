import { test, expect } from '@playwright/test';

test('トップページの表示チェック', async ({ page }) => {
  await page.goto('https://dev.kintai.virtualtech.jp');
  
  await expect(page.getByRole('heading', { name: '出勤前' })).toBeVisible();
});
