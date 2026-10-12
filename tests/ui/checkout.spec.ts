import { test, expect } from "../../fixtures/fixtures";
import { users } from "../../test-data/users";
import { checkoutNegativeData } from "../../test-data/checkoutNegative";

test.beforeEach(
  "Login and add product to cart - checkout",
  async ({ loginPage, cartPage, checkoutPage }) => {
    console.log("Login, add product to cart - checkout");

    await loginPage.launchSite();

    await loginPage.loginUser(users.validUsername, users.password);

    await cartPage.addProductToCart(0);

    await cartPage.goToCart();

    const prdName = await cartPage.getProductNameInCart();

    expect(prdName).toContain("Sauce");

    await checkoutPage.clickOnCheckout();
  },
);

checkoutNegativeData.forEach((data) => {
  test(`Verify ${data.name}`, async ({ checkoutPage }) => {
    console.log(`Verifying ${data.name}`);

    await checkoutPage.enterYourInformation(
      data.firstName,
      data.lastName,
      data.zipCode,
    );

    await checkoutPage.clickOnContinue();

    const errMsg = await checkoutPage.getErrorMessage();

    expect(errMsg).toContain(data.error);
  });
});

test("Cancel checkout", async ({ checkoutPage, cartPage }) => {
  console.log("Verifying cancel checkout");

  await checkoutPage.enterYourInformation("first", "last", "12345");

  await checkoutPage.clickOnCancel();

  const url = await cartPage.cartPageURL();

  expect(url).toContain("cart");
});

test("Enter valid informations and continue", async ({ checkoutPage }) => {
  console.log("Verifying valid information and continue");

  await checkoutPage.enterYourInformation("first", "last", "12345");

  await checkoutPage.clickOnContinue();

  const title = await checkoutPage.getPageTitle();

  expect(title).toContain("Checkout");

  console.log("Verifying product information before finish");

  const prdName = await checkoutPage.getProductNameBeforeFinish();

  expect(prdName).toContain("Sauce Labs Backpack");

  await checkoutPage.clickOnFinish();

  const orderMessage = await checkoutPage.getCompleteOrderMessage();

  expect(orderMessage).toContain("Thank you");
});
