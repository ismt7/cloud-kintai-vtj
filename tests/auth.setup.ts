import { test as setup, expect, Page } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

const adminAuthFile = "playwright/.auth/admin.json";

setup("認証(管理者)", async ({ page }) => {
  await page.goto("/login");

  await inputMailAddress(page, process.env.PLAYWRIGHT_ADMIN_EMAIL);
  await inputPassword(page, process.env.PLAYWRIGHT_ADMIN_PASSWORD);

  await page.getByRole("button", { name: "ログイン" }).click();

  await page.waitForURL("/");

  await expect(page.getByRole("heading", { name: "出勤前" })).toBeVisible();

  await page.context().storageState({ path: adminAuthFile });
});

const userAuthFile = "playwright/.auth/user.json";

setup("認証(スタッフ)", async ({ page }) => {
  await page.goto("/login");

  await inputMailAddress(page, process.env.PLAYWRIGHT_USER_EMAIL);
  await inputPassword(page, process.env.PLAYWRIGHT_USER_PASSWORD);

  await page.getByRole("button", { name: "ログイン" }).click();

  await page.waitForURL("/");

  await expect(page.getByRole("heading", { name: "出勤前" })).toBeVisible();

  await page.context().storageState({ path: userAuthFile });
});

async function inputPassword(page: Page, value: string | undefined) {
  if (value === undefined) {
    throw new Error("PLAYWRIGHT_USER_PASSWORD is not defined in .env file");
  }

  const locator = page.getByPlaceholder("パスワードを入力");
  await locator.click();
  await locator.fill(value);
}

async function inputMailAddress(page: Page, value: string | undefined) {
  if (value === undefined) {
    throw new Error("PLAYWRIGHT_USER_EMAIL is not defined in .env file");
  }

  const locator = page.getByPlaceholder("メールアドレスを入力");
  await locator.click();
  await locator.fill(value);
}
