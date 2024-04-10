import { test, expect } from "@playwright/test";
import dayjs from "dayjs";

test("勤怠編集ページ", async ({ page }) => {
  const today = dayjs().format("YYYYMMDD");
  await page.goto(`/attendance/${today}/edit`);

  await expect(page.getByRole("heading", { name: "勤怠編集" })).toBeVisible();
});
