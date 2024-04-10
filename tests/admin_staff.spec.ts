import { test, expect } from "@playwright/test";

test.describe("スタッフ管理ページ(権限：ユーザー)", () => {
  test.use({ storageState: "playwright/.auth/user.json" });

  test("表示チェック", async ({ page }) => {
    await page.goto("/admin/staff");

    await expect(page.getByRole("heading", { name: "NotFound" })).toBeVisible();
  });
});

test.describe("スタッフ管理ページ(権限：管理者)", () => {
  test.use({ storageState: "playwright/.auth/admin.json" });

  test("表示チェック", async ({ page }) => {
    await page.goto("/admin/staff");

    await expect(
      page.getByRole("heading", { name: "スタッフ一覧" })
    ).toBeVisible();
  });
});
