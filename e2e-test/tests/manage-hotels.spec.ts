import { test, expect } from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  // get the sign in button
  await page.getByRole("link", { name: "Sign In" }).click();

  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();

  await page.locator("[name=email]").fill("test@test.com");
  await page.locator("[name=password]").fill("testpassword");

  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Sign in Successfull")).toBeVisible();
});

test("should allow the user to create the hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);

  await page.locator("[name=name]").fill("Test Hotel");
  await page.locator("[name=city]").fill("Test City");
  await page.locator("[name=country]").fill("Test Country");
  await page.locator("[name=description]").fill("Test Hotel Description");
  await page.locator("[name=pricePerNight]").fill("2000");
  await page.selectOption("select[name=starRating]", "3 Stars");

  await page.getByText("Budget").click();

  await page.getByText("Free Wifi").check();
  await page.getByText("Parking").check();
  await page.getByText("Non-Smoking Rooms").check();

  await page.locator("[name=adultCount]").fill("5");
  await page.locator("[name=childCount]").fill("2");

  await page.setInputFiles("[name=imageFiles]", [
    path.join(__dirname, "files", "1.png"),
    path.join(__dirname, "files", "2.png"),
    path.join(__dirname, "files", "2.png"),
  ]);

  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Hotel added successfully")).toBeVisible();
});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await expect(page.getByText("My Hotels")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Test Hotel" }).first()
  ).toBeVisible();
  await expect(page.getByText("Test Hotel Description").first()).toBeVisible();
  await expect(page.getByText("Test City, Test Country").first()).toBeVisible();
  await expect(page.getByText("Budget").first()).toBeVisible();
  await expect(page.getByText("₹2000 per night").first()).toBeVisible();
  await expect(page.getByText("5 adults, 2 children").first()).toBeVisible();
  await expect(page.getByText("3 stars").first()).toBeVisible();

  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
});

test("should update hotel", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await page.getByRole("link", { name: "View Details" }).first().click();

  await page.waitForSelector("[name=name]", { state: "attached" });

  await expect(page.locator("[name=name]")).toHaveValue("Test Hotel");
  await page.locator("[name=name]").fill("Updated Test Hotel");
  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.getByText("Hotel Updated Successfull")).toBeVisible();

  await page.goto(`${UI_URL}my-hotels`);
  await page.getByRole("link", { name: "View Details" }).first().click();

  await expect(page.locator("[name=name]")).toHaveValue("Updated Test Hotel");
  await page.locator("[name=name]").fill("Test Hotel");
  await page.getByRole("button", { name: "Save" }).click();
});
