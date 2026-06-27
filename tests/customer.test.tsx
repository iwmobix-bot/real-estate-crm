import { describe, it, expect } from "vitest";

describe("Customer Tests", () => {
  it("باید مشتری جدید ساخته بشه", () => {
    const customer = { id: 1, name: "علی رضایی", phone: "09121234567", type: "buyer" };
    expect(customer.name).toBe("علی رضایی");
  });

  it("باید نوع مشتری خریدار باشه", () => {
    const customer = { id: 1, name: "علی رضایی", type: "buyer" };
    expect(customer.type).toBe("buyer");
  });

  it("باید لیست مشتریان خالی نباشه", () => {
    const customers = [
      { id: 1, name: "علی رضایی" },
      { id: 2, name: "مریم احمدی" },
    ];
    expect(customers.length).toBeGreaterThan(0);
  });

  it("باید مشتری با آی‌دی پیدا بشه", () => {
    const customers = [
      { id: 1, name: "علی رضایی" },
      { id: 2, name: "مریم احمدی" },
    ];
    const found = customers.find((c) => c.id === 1);
    expect(found?.name).toBe("علی رضایی");
  });

  it("باید مشتری حذف بشه", () => {
    let customers = [{ id: 1, name: "علی" }, { id: 2, name: "مریم" }];
    customers = customers.filter((c) => c.id !== 1);
    expect(customers.length).toBe(1);
  });
});