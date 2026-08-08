import { test, expect } from "../../fixtures/fixtures";
import { users } from "../../test-data/users";
test.beforeEach("Launch Site and Login", async ({ loginPage }) => {
  console.log("Launching site...");
  await loginPage.launchSite();
  await loginPage.loginUser(users.validUsername, users.password);
});

test("Verify product listing is displayed", async ({ productPage }) => {
  console.log("Verifying product list");
  const products = productPage.getProductList();
  expect(products).toBeVisible();
});

test.describe("Verify first product informations", () => {
  test("Verify product name", async ({ productPage }) => {
    console.log("Verifying product name");
    const productName = productPage.getProductName();
    expect(productName).toHaveText("Sauce Labs Backpack");
  });
  test("Verify product price", async ({ productPage }) => {
    console.log("Verifying product prize");
    const productPrice = await productPage.getProductPrice();
    expect(productPrice).toContain("$");
  });
  test("Verify product image", async ({ productPage }) => {
    console.log("Verifying product image");
    const productImage = productPage.getProductImage();
    expect(productImage).toHaveAttribute(
      "src",
      /sauce-backpack.*\.(jpg|jpeg|png)$/,
    );
  });
});

test("Verify all product images", async ({ productPage }) => {
  console.log("Verifying all products image");
  const catchLocator = productPage.getAllProductsImages();

  for (let i = 0; i < (await catchLocator.count()); i++) {
    await expect(catchLocator.nth(i)).toBeVisible();
  }
});

test("Verify all product prices", async ({ productPage }) => {
  console.log("Verifying all products prices");
  const catchLocator = productPage.getAllProductsPrices();

  for (let i = 0; i < (await catchLocator.count()); i++) {
    const productPrices = await catchLocator.nth(i);
    await expect(productPrices).toContainText("$");
  }
});

test("Verify inventory count", async ({ productPage }) => {
  console.log("Verifying Inventory count");
  const inventoryCount = await productPage.getInventoryCount();
  expect(inventoryCount).toBeGreaterThan(3);
});

test("Verify Sort by Name A-Z", async ({ productPage }) => {
  console.log("Verifying Sort by Name A-Z");
  const actualSort = await productPage.getSortingListA_Z();
  const expectedSort = [...actualSort].sort();
  expect(actualSort).toEqual(expectedSort);
  //console.log(actualSort);
  //console.log(expectedSort);
});
test("Verify Sort by Name Z-A", async ({ productPage }) => {
  console.log("Verifying Sort by Name Z-A");
  const actualSort = await productPage.getSortingListZ_A();
  const expectedSort = [...actualSort].sort().reverse();
  expect(actualSort).toEqual(expectedSort);
});
test("Verify Sort by Price low to high", async ({ productPage }) => {
  console.log("Verifying Sort by Price low to high");
  const actualSort = await productPage.getSortingPriceLow_High();
  const expectedSort = [...actualSort].sort((a, b) => a - b);
  expect(actualSort).toEqual(expectedSort);
});
test("Verify Sort by Price high to low", async ({ productPage }) => {
  console.log("Verifying Sort by Price high to low");
  const actualSort = await productPage.getSortingPriceHigh_Low();
  const expectedSort = [...actualSort].sort((a, b) => b - a);
  expect(actualSort).toEqual(expectedSort);
});
test("Verify Navigated to product details page", async ({ productPage }) => {
  console.log("Verifying navigation to product details page");
  const obj = await productPage.navigateToProductDetails();
  expect(obj.url).toContain("id");
  await expect(obj.button).toBeVisible();
});
test("Verify Navigated back to product list page", async ({ productPage }) => {
  console.log("Verifying navigated back to product list page");
  const detailsPage = await productPage.navigateToProductDetails();
  expect(detailsPage.url).toContain("inventory-item");
  await expect(detailsPage.button).toBeVisible();
  const inventoryList = await productPage.navigateBackToProductList();
  await expect(inventoryList).toBeVisible();
  expect(productPage.page.url()).toContain("inventory");
});
