import { test, expect } from "@playwright/test";

test.describe("Login Page - E2E Tests", () => {
  test("login page loads", async ({ page }) => {
    await page.goto("http://localhost:5173");
    await expect(page.locator("body")).toBeVisible();
  });

  test("login with correct credentials", async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.locator("input").nth(0).fill("admin");
    await page.locator("input").nth(1).fill("1234");
    await page.locator("button").nth(0).click();
    await expect(page.locator("body")).toContainText("داشبورد");
  });

  test("login with wrong password shows error", async ({ page }) => {
    await page.goto("http://localhost:5173");
    await page.locator("input").nth(0).fill("admin");
    await page.locator("input").nth(1).fill("wrong");
    await page.locator("button").nth(0).click();
    await expect(page.locator("body")).toContainText("اشتباه");
  });
});