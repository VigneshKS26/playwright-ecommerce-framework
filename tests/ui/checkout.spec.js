import { test, expect } from "../../fixtures/fixtures";
import { users } from "../../test-data/users";
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

test("Verify empty firstname", async ({ checkoutPage }) => {
  console.log("Verifying empty firstname");
  await checkoutPage.enterYourInformation("", "one", "12345");
  await checkoutPage.clickOnContinue();
  const errMsg = await checkoutPage.getErrorMessage();
  expect(errMsg).toContain("First Name is required");
});
test("Verify empty lastname", async ({ checkoutPage }) => {
  console.log("Verifying empty lastname");
  await checkoutPage.enterYourInformation("first", "", "12345");
  await checkoutPage.clickOnContinue();
  const errMsg = await checkoutPage.getErrorMessage();
  expect(errMsg).toContain("Last Name is required");
});
test("Verify empty zip code", async ({ checkoutPage }) => {
  console.log("Verifying empty zip code");
  await checkoutPage.enterYourInformation("first", "last", "");
  await checkoutPage.clickOnContinue();
  const errMsg = await checkoutPage.getErrorMessage();
  expect(errMsg).toContain("Postal Code is required");
});
test("Cancel checkout", async ({ checkoutPage, cartPage }) => {
  console.log("Verifying cancel checkout");
  await checkoutPage.enterYourInformation("first", "last", "12345");
  await checkoutPage.clickOnCancel();
  const url = cartPage.cartPageURL();
  expect(url).toContain("cart");
});

test("Enter valid informations and continue", async ({ checkoutPage }) => {
  console.log("Verifying valid information and continue");
  await checkoutPage.enterYourInformation("first", "last", "12345");
  await checkoutPage.clickOnContinue();
  const title = await checkoutPage.getPageTitle();
  expect(title).toContain("Overview");
  console.log("Verifying product information before finish");
  const prdName = await checkoutPage.getProductNameBeforeFinish();
  expect(prdName).toContain("Sauce Labs Backpack");
  //i can use cartPage object, but to use checkoutPage object i re-created that locator
  await checkoutPage.clickOnFinish();
  const orderMessage = await checkoutPage.getCompleteOrderMessage();
  expect(orderMessage).toContain("Thank you");
});
/* test("Verify product information before finish", async ({
  cartPage,
  checkoutPage,
}) => {
  console.log("Verifying product information before finish");
  await checkoutPage.verifyProductNameBeforeFinish("Sauce Labs Backpack");
  //i can use cartPage object, but to use checkoutPage object i re-created that locator
  await checkoutPage.clickOnFinish();
}); */
