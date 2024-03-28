import { test, expect } from "@playwright/test";

test("スタッフ管理ページ", async ({ page }) => {
  await page.goto("/admin/staff");

  await expect(page.getByRole("heading", { name: "NotFound" })).toBeVisible();
});
