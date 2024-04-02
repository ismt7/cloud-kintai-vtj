import { test, expect } from "@playwright/test";

test.describe("勤怠打刻ページ", () => {
  test("出勤前", async ({ page }) => {
    await page.goto("/register");

    await expect(page.getByRole("heading", { name: "出勤前" })).toBeVisible();

    await expect(page.getByRole("button", { name: "勤務開始" })).toBeEnabled();
    await expect(page.getByRole("button", { name: "勤務終了" })).toBeDisabled();
    await expect(page.getByRole("button", { name: "直行" })).toBeEnabled();
    await expect(page.getByRole("button", { name: "直帰" })).toBeDisabled();
    await expect(page.getByRole("button", { name: "休憩開始" })).toBeDisabled();
    await expect(page.getByRole("button", { name: "休憩終了" })).toBeDisabled();
  });

  test.describe("出勤打刻(通常)", () => {
    test("打刻画面チェック", async ({ page }) => {
      await page.goto("/register");

      await page.getByRole("button", { name: "勤務開始" }).click();

      await expect(page.getByRole("heading", { name: "勤務中" })).toBeVisible();

      await expect(page.getByRole("button", { name: "勤務開始" })).toBeDisabled();
      await expect(page.getByRole("button", { name: "勤務終了" })).toBeEnabled();
      await expect(page.getByRole("button", { name: "直行" })).toBeDisabled();
      await expect(page.getByRole("button", { name: "直帰" })).toBeEnabled();
      await expect(page.getByRole("button", { name: "休憩開始" })).toBeEnabled();
      await expect(page.getByRole("button", { name: "休憩終了" })).toBeDisabled();
    });

    test("勤怠一覧チェック", async ({ page }) => {
      await page.goto("/attendance/list");
    });
  });
});
