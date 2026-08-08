import { test, expect } from "../../fixtures/fixtures";
import { users } from "../../test-data/users";
test.beforeEach("Launch Site and Login", async ({ loginPage }) => {
  console.log("Launching site...");
  await loginPage.launchSite();
  await loginPage.loginUser(users.validUsername, users.password);
});

test("Add one product to cart and verify cart badge number", async ({
  cartPage,
}) => {
  console.log("Adding one product to cart and verifying cart badge number");
  await cartPage.addProductToCart(0);
  const cartBadgeNumber = await cartPage.getCartBadgeNumber();
  expect(cartBadgeNumber).toBe(1);
});

test("Add multiple product to cart and verify cart badge number", async ({
  cartPage,
}) => {
  console.log(
    "Adding multiple product to cart and verifying cart badge number",
  );
  for (let i = 0; i < 3; i++) {
    await cartPage.addProductToCart(i);
  }
  const cartBadgeNumber = await cartPage.getCartBadgeNumber();
  expect(cartBadgeNumber).toBe(3);
});
test("Add products to cart Remove it from cart", async ({ cartPage }) => {
  console.log("Verifying remove one product from cart");
  for (let i = 0; i < 3; i++) {
    await cartPage.addProductToCart(i);
  }
  await cartPage.removeProductFromCart(1);
  const cartBadgeNumber = await cartPage.getCartBadgeNumber();
  expect(cartBadgeNumber).toBe(2);
});
test("Add multiple products to cart Remove some from cart", async ({
  cartPage,
}) => {
  console.log("Verifying remove multiple products from cart");
  for (let i = 0; i < 3; i++) {
    await cartPage.addProductToCart(i);
  }
  ///////////////
  await cartPage.removeAllProductsFromCart();
  const catchLocator = cartPage.cartBadgeIsNotAttached();
  await expect(catchLocator).not.toBeAttached();
});
test("Add multiple products to cart and verify cart list", async ({
  cartPage,
}) => {
  console.log("Verifying cart list");
  for (let i = 0; i < 3; i++) {
    await cartPage.addProductToCart(i);
  }
  await cartPage.goToCart();
  const productsCount = await cartPage.productsCountInCart();
  expect(productsCount).toBe(3);
  const productQuantity = await cartPage.productsQuantityInCart();
  expect(productQuantity).toEqual(["1", "1", "1"]);
});
test("Verify cart badge after clicking on continue shopping button", async ({
  cartPage,
}) => {
  console.log(
    "Verifying cart badge after clicking on continue shopping button ",
  );
  for (let i = 0; i < 3; i++) {
    await cartPage.addProductToCart(i);
  }
  await cartPage.goToCart();
  const catchLocator = cartPage.getContinueShoppingButton();
  await expect(catchLocator).toBeVisible();
  await cartPage.clickContinueShopping();
  const cartBadgeNumber = await cartPage.getCartBadgeNumber();
  expect(cartBadgeNumber).toBe(3);
});
