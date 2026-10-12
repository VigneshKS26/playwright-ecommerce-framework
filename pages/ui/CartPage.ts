import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class CartPage extends BasePage {
  addToCartButton: Locator;
  cartBadgeNumber: Locator;
  removeFromCartButton: Locator;
  cartButton: Locator;
  productsInCart: Locator;
  productsQuantity: Locator;
  continueShoppingButton: Locator;
  productNameInCart: Locator;

  constructor(page: Page) {
    super(page);
    this.addToCartButton = page.getByRole("button", { name: "Add to Cart" });
    this.cartBadgeNumber = page.locator(".shopping_cart_badge");
    this.removeFromCartButton = page.getByRole("button", { name: "Remove" });
    this.cartButton = page.locator(".shopping_cart_link");
    this.productsInCart = page.locator(".cart_item");
    this.productsQuantity = page.locator(".cart_quantity");
    this.continueShoppingButton = page.locator("#continue-shopping");
    this.productNameInCart = page.locator(".inventory_item_name");
  }

  async addProductToCart(i: number): Promise<void> {
    await this.addToCartButton.nth(i).click();
  }
  /* async addSecondProductToCart() {
    await this.addToCartButton.nth(1).click();
  }
  async addThirdProductToCart() {
    await this.addToCartButton.nth(2).click();
  } */
  async getCartBadgeNumber(): Promise<number> {
    return +(await this.cartBadgeNumber.textContent())!;
  }

  async removeProductFromCart(i: number): Promise<void> {
    await this.removeFromCartButton.nth(i).click();
  }
  cartBadgeIsNotAttached(i?: number): Locator {
    return this.cartBadgeNumber;
  }
  async removeAllProductsFromCart(): Promise<void> {
    while ((await this.removeFromCartButton.count()) > 0) {
      await this.removeFromCartButton.first().click();
    }
  }
  async goToCart(): Promise<void> {
    await this.cartButton.click();

    await this.page.waitForURL(/cart/);
  }
  async productsCountInCart(): Promise<number> {
    await expect(this.productsInCart.first()).toBeVisible();

    return await this.productsInCart.count();
  }
  async productsQuantityInCart(): Promise<string[]> {
    return this.productsQuantity.allTextContents();
  }
  /* async getContinueShopping() {
    return await this.continueShoppingButton;
    await this.continueShoppingButton.click();
  } */
  getContinueShoppingButton(): Locator {
    return this.continueShoppingButton;
  }

  async clickContinueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }
  async getProductNameInCart(): Promise<string | null> {
    return await this.productNameInCart.first().textContent();
  }
  cartPageURL(): string {
    return this.page.url();
  }
}