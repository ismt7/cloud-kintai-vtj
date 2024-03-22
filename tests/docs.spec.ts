import { test, expect } from '@playwright/test';

test('ドキュメントページの表示チェック', async ({ page }) => {
  await page.goto('https://dev.kintai.virtualtech.jp/docs');
  
  await expect(page.getByText('ドキュメント一覧')).toBeVisible();
});
