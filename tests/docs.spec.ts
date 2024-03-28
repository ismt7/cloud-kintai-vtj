import { test, expect } from "@playwright/test";

test("ドキュメントページの表示チェック", async ({ page }) => {
  await page.goto("/docs");

  await expect(page.getByText("ドキュメント一覧")).toBeVisible();
});
