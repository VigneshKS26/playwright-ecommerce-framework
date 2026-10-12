import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

interface ProductCollectionResponse {
  data: Array<{
    data: {
      name: string;
      [field: string]: unknown;
    };
  }>;
}

function requiredEnvironmentVariable(name: string): string {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

test.describe("API + UI + Network Interception", () => {
  async function loginAndOpenSampleData(page: Page): Promise<void> {
    await page.goto(requiredEnvironmentVariable("PROJECT_URL"));

    await page.getByText("Sign in").click();

    await page
      .getByLabel("Email address")
      .fill(requiredEnvironmentVariable("EMAIL"));

    await page.getByRole("button", { name: "Continue", exact: true }).click();

    await page
      .getByRole("textbox", { name: "Password" })
      .fill(requiredEnvironmentVariable("PASSWORD"));

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

    const createResponse = await request.post(
      requiredEnvironmentVariable("API_URL"),
      {
        data: {
          data: payload,
        },
        headers: {
          "x-api-key": requiredEnvironmentVariable("API_KEY"),
        },
      },
    );

    expect(createResponse.status()).toBe(201);

    await loginAndOpenSampleData(page);

    await expect(page.getByText(productName).first()).toBeVisible();
  });

  test("Mock product name using route.fulfill()", async ({ page }) => {
    await page.route("**/collections/products/records**", async (route) => {
      const response = await route.fetch();

      const body: ProductCollectionResponse = await response.json();

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