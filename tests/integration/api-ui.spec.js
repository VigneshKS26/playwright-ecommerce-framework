import { test, expect } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

test.describe("API + UI + Network Interception", () => {
  async function loginAndOpenSampleData(page) {
    await page.goto(process.env.PROJECT_URL);

    await page.getByText("Sign in").click();

    await page.getByLabel("Email address").fill(process.env.EMAIL);

    await page.getByRole("button", { name: "Continue", exact: true }).click();

    await page
      .getByRole("textbox", { name: "Password" })
      .fill(process.env.PASSWORD);

    await page.getByRole("button", { name: "Continue", exact: true }).click();

    await page.getByRole("button", { name: "See my project" }).click();

    await page.waitForLoadState("networkidle");

    await page.getByRole("heading", { name: "START HERE" }).click();

    await page.getByText("Sample data loaded").click();
  }

  test("Validate API product against UI", async ({ request, page }) => {
    const productName = `Carrot-${Date.now().toString().slice(-6)}`;

    const payload = {
      name: productName,
      price: 1.0,
      category: "Vegetables",
      in_stock: true,
    };

    const createResponse = await request.post(process.env.API_URL, {
      data: {
        data: payload,
      },
      headers: {
        "x-api-key": process.env.API_KEY,
      },
    });

    expect(createResponse.status()).toBe(201);

    await loginAndOpenSampleData(page);

    await expect(page.getByText(productName).first()).toBeVisible();
  });

  test("Mock product name using route.fulfill()", async ({ page }) => {
    await page.route("**/collections/products/records**", async (route) => {
      const response = await route.fetch();

      const body = await response.json();

      body.data[0].data.name = "Mocked Product";

      await route.fulfill({
        response,
        json: body,
      });
    });

    await loginAndOpenSampleData(page);

    await expect(page.getByText("Mocked Product")).toBeVisible();
  });

  test("Mock server error using route.fulfill()", async ({ page }) => {
    await page.route("**/collections/products/records**", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          error: "Internal Server Error",
        }),
      });
    });

    await loginAndOpenSampleData(page);

    await expect(page.locator("tbody tr")).toHaveCount(0);
  });
});
