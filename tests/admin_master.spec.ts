import { test, expect } from "@playwright/test";

test("マスタページ", async ({ page }) => {
  await page.goto("/admin/master");

  await expect(page.getByRole("heading", { name: "NotFound" })).toBeVisible();
});
