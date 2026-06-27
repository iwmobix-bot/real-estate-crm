import { test, expect } from "@playwright/test";

const login = async (page: any) => {
  await page.goto("http://localhost:5173");
  await page.locator("input").nth(0).fill("admin");
  await page.locator("input").nth(1).fill("1234");
  await page.locator("button").nth(0).click();
  await page.locator("text=مشتریان").first().click();
};

test.describe("Customers Page - E2E Tests", () => {
  test("customers page loads", async ({ page }) => {
    await login(page);
    await expect(page.locator("body")).toContainText("افزودن مشتری");
  });

  test("default customers are visible", async ({ page }) => {
    await login(page);
    await expect(page.locator("body")).toContainText("علی رضایی");
  });
});