import { BasePage } from "./BasePage";
export class CartPage extends BasePage {
  constructor(page) {
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

  async addProductToCart(i) {
    await this.addToCartButton.nth(i).click();
  }
  /* async addSecondProductToCart() {
    await this.addToCartButton.nth(1).click();
  }
  async addThirdProductToCart() {
    await this.addToCartButton.nth(2).click();
  } */
  async getCartBadgeNumber() {
    return +(await this.cartBadgeNumber.textContent());
  }

  async removeProductFromCart(i) {
    await this.removeFromCartButton.nth(i).click();
  }
  cartBadgeIsNotAttached(i) {
    return this.cartBadgeNumber;
  }
  async removeAllProductsFromCart() {
    while ((await this.removeFromCartButton.count()) > 0) {
      await this.removeFromCartButton.first().click();
    }
  }
  async goToCart() {
    await this.cartButton.click();
  }
  async productsCountInCart() {
    return await this.productsInCart.count();
  }
  async productsQuantityInCart() {
    return this.productsQuantity.allTextContents();
  }
  /* async getContinueShopping() {
    return await this.continueShoppingButton;
    await this.continueShoppingButton.click();
  } */
  getContinueShoppingButton() {
    return this.continueShoppingButton;
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }
  async getProductNameInCart() {
    return await this.productNameInCart.textContent();
  }
  cartPageURL() {
    return this.page.url();
  }
}
