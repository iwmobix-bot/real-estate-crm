import { describe, it, expect } from "vitest";

describe("Login Tests", () => {
  it("باید ۲ به علاوه ۲ برابر ۴ باشه", () => {
    expect(2 + 2).toBe(4);
  });

  it("باید رشته admin درست باشه", () => {
    expect("admin").toBe("admin");
  });

  it("باید رمز عبور اشتباه رد بشه", () => {
    const checkLogin = (u: string, p: string) => u === "admin" && p === "1234";
    expect(checkLogin("admin", "wrong")).toBe(false);
  });

  it("باید لاگین با اطلاعات درست موفق باشه", () => {
    const checkLogin = (u: string, p: string) => u === "admin" && p === "1234";
    expect(checkLogin("admin", "1234")).toBe(true);
  });
});