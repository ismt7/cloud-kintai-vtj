import { expect, test } from "@playwright/test";

const basePath = process.env.VITE_BASE_PATH || "http://localhost:5173";

test.describe.configure({ retries: 0 });

test.use({ storageState: "playwright/.auth/out-user.json" });

test.describe("直行/直帰モード(ON)", () => {
  test("直行", async ({ page }) => {
    await page.goto(`${basePath}/`);
    await page.click('[data-testid="direct-mode-switch"]');
    await expect(
      page.locator('[data-testid="go-directly-button"]')
    ).toBeVisible();
    await expect(
      page.locator('[data-testid="return-directly-button"]')
    ).toBeVisible();
  });

  test("直行ボタンをクリック", async ({ page }) => {
    await page.goto(`${basePath}/`);
    await page.click('[data-testid="direct-mode-switch"]');
    await page.click('[data-testid="go-directly-button"]');
    await expect(page.locator('[data-testid="work-status-text"]')).toHaveText(
      "勤務中"
    );
  });

  test("直帰ボタンをクリック", async ({ page }) => {
    await page.goto(`${basePath}/`);
    await page.click('[data-testid="direct-mode-switch"]');
    await expect(
      page.locator('[data-testid="return-directly-button"]')
    ).toBeVisible();
    await page.click('[data-testid="return-directly-button"]');
    await expect(page.locator('[data-testid="work-status-text"]')).toHaveText(
      "勤務終了"
    );
  });
});
