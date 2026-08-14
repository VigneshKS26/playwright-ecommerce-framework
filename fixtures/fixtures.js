import { AuthAPI } from "../pages/api/AuthAPI";
import { BookingAPI } from "../pages/api/BookingAPI";
import { CartPage } from "../pages/ui/CartPage";
import { CheckoutPage } from "../pages/ui/CheckoutPage";
import { LoginPage } from "../pages/ui/LoginPage";
import { ProductPage } from "../pages/ui/ProductPage";
import { test as base } from "@playwright/test";
export { expect } from "@playwright/test";
export const test = base.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
  authAPI: async ({ request }, use) => {
    const authAPI = new AuthAPI(request);
    await use(authAPI);
  },
  bookingAPI: async ({ request }, use) => {
    const bookingAPI = new BookingAPI(request);
    await use(bookingAPI);
  },
});
