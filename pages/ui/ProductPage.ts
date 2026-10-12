import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class ProductPage extends BasePage {
  inventoryList: Locator;
  productList: Locator;
  product: Locator;
  productName: Locator;
  productPrice: Locator;
  productImage: Locator;
  sortButton: Locator;
  backToProductButton: Locator;

  constructor(page: Page) {
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

  getProductList(): Locator {
    return this.inventoryList;
  }
  getProductName(): Locator {
    return this.productName;
  }
  async getProductPrice(): Promise<string | null> {
    return await this.productPrice.textContent();
  }
  getProductImage(): Locator {
    return this.productImage;
  }
  getAllProductsImages(): Locator {
    return this.productImage;
  }
  getAllProductsPrices(): Locator {
    return this.productPrice;
  }
  async waitForInventoryToLoad(): Promise<void> {
    await expect(this.inventoryList).toBeVisible();
  }
  async getInventoryCount(): Promise<number> {
    await this.waitForInventoryToLoad();
    return await this.productList.count();
  }
  async getSortingListA_Z(): Promise<(string | null)[]> {
    await this.sortButton.selectOption("Name (A to Z)");
    const productNames: (string | null)[] = [];
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
  async getSortingListZ_A(): Promise<(string | null)[]> {
    await this.sortButton.selectOption("Name (Z to A)");
    const productNames: (string | null)[] = [];
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
  async getSortingPriceLow_High(): Promise<number[]> {
    await this.sortButton.selectOption("Price (low to high)");
    const productPrice: number[] = [];
    for (let i = 0; i < (await this.productList.count()); i++) {
      productPrice.push(
        Number(
          (await this.productList
            .nth(i)
            .locator(".inventory_item_price")
            .textContent())!.slice(1),
        ),
      );
    }
    return productPrice;
  }
  async getSortingPriceHigh_Low(): Promise<number[]> {
    await this.sortButton.selectOption("Price (high to low)");
    const productPrice: number[] = [];
    for (let i = 0; i < (await this.productList.count()); i++) {
      productPrice.push(
        Number(
          (await this.productList
            .nth(i)
            .locator(".inventory_item_price")
            .textContent())!.slice(1),
        ),
      );
    }
    return productPrice;
  }
  async navigateToProductDetails(): Promise<{ url: string; button: Locator }> {
    await this.productName.filter({ hasText: "Sauce Labs Backpack" }).click();
    return { url: this.page.url(), button: this.backToProductButton };
  }
  async navigateBackToProductList(): Promise<Locator> {
    await this.backToProductButton.click();
    return this.inventoryList;
  }
  /* async goToFirstProduct() {
    await this.productName.filter({ hasText: "Sauce Labs Backpack" }).click();
  } */
}
