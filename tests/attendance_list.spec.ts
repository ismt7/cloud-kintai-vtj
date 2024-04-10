import { test, expect } from "@playwright/test";

test("勤怠一覧ページの表示チェック", async ({ page }) => {
  await page.goto("/attendance/list");

  await expect(page.getByRole("heading", { name: "勤怠一覧" })).toBeVisible();
});
