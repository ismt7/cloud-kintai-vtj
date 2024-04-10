import { test, expect } from "@playwright/test";

test("勤怠管理ページ", async ({ page }) => {
  await page.goto("/admin/attendances");

  await expect(page.getByRole("heading", { name: "NotFound" })).toBeVisible();
});
