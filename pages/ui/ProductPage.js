import { BasePage } from "./BasePage";
export class ProductPage extends BasePage {
  constructor(page) {
    super(page);
    this.inventoryList = page.locator('[data-test="inventory-list"]');
    this.productList = page.locator(".inventory_item");
    this.product = page.locator(".inventory_item").filter({
      has: page.getByText("Sauce Labs Backpack"),
    });
    this.productName = this.product.locator(".inventory_item_name");
    this.productPrice = this.product.locator(".inventory_item_price");
    this.productImage = this.product.locator("img");
    this.sortButton = page.locator(".product_sort_container");
    this.backToProductButton = page.locator("#back-to-products");
  }

   getProductList() {
    return this.inventoryList;
  }
   getProductName() {
    return  this.productName;
  }
  async getProductPrice() {
    return await this.productPrice.textContent();
  }
   getProductImage() {
    return this.productImage;
  }
   getAllProductsImages() {
   return this.productImage;

  }
   getAllProductsPrices() {
    return this.productPrice;
  }
  async getInventoryCount() {
    return await this.productList.count();
  }
  async getSortingListA_Z() {
    await this.sortButton.selectOption("Name (A to Z)");
    let productNames = [];
    for (let i = 0; i < (await this.productList.count()); i++) {
      productNames.push(
        await this.productList
          .nth(i)
          .locator(".inventory_item_name")
          .textContent(),
      );
    }
    return productNames;
  }
  async getSortingListZ_A() {
    await this.sortButton.selectOption("Name (Z to A)");
    let productNames = [];
    for (let i = 0; i < (await this.productList.count()); i++) {
      productNames.push(
        await this.productList
          .nth(i)
          .locator(".inventory_item_name")
          .textContent(),
      );
    }
    return productNames;
  }
  async getSortingPriceLow_High() {
    await this.sortButton.selectOption("Price (low to high)");
    let productPrice = [];
    for (let i = 0; i < (await this.productList.count()); i++) {
      productPrice.push(
        Number(
          (
            await this.productList
              .nth(i)
              .locator(".inventory_item_price")
              .textContent()
          ).slice(1),
        ),
      );
    }
    return productPrice;
  }
  async getSortingPriceHigh_Low() {
    await this.sortButton.selectOption("Price (high to low)");
    let productPrice = [];
    for (let i = 0; i < (await this.productList.count()); i++) {
      productPrice.push(
        Number(
          (
            await this.productList
              .nth(i)
              .locator(".inventory_item_price")
              .textContent()
          ).slice(1),
        ),
      );
    }
    return productPrice;
  }
  async navigateToProductDetails() {
    await this.productName.filter({ hasText: "Sauce Labs Backpack" }).click();
    return {url:this.page.url(),
      button:this.backToProductButton};
    
  }
  async navigateBackToProductList() {
    await this.backToProductButton.click();
    return this.inventoryList;
  }
  /* async goToFirstProduct() {
    await this.productName.filter({ hasText: "Sauce Labs Backpack" }).click();
  } */
}
