import { test, expect } from "@playwright/test";

test("個人設定ページ", async ({ page }) => {
  await page.goto("/profile");

  await expect(page.getByText("個人設定")).toBeVisible();
});
