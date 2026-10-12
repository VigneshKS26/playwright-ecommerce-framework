import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  checkOutButton: Locator;
  enterFirstName: Locator;
  enterLastName: Locator;
  enterZipCode: Locator;
  errorMessage: Locator;
  cancelButton: Locator;
  continueButton: Locator;
  pageTitle: Locator;
  productNameBeforeFinish: Locator;
  finishButton: Locator;
  orderMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.checkOutButton = page.locator("#checkout");
    this.enterFirstName = page.getByPlaceholder("First Name");
    this.enterLastName = page.getByPlaceholder("Last Name");
    this.enterZipCode = page.getByPlaceholder("Zip/Postal Code");
    this.errorMessage = page.locator('[data-test="error"]');
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
    this.continueButton = page.getByRole("button", { name: "Continue" });
    this.pageTitle = page.locator(".title");
    this.productNameBeforeFinish = page.locator(".inventory_item_name");
    this.finishButton = page.getByRole("button", { name: "Finish" });
    this.orderMessage = page.locator(".complete-header");
  }
  async clickOnCheckout(): Promise<void> {
    await this.checkOutButton.click();
  }
  async enterYourInformation(
    firstName: string,
    lastName: string,
    zipCode: string,
  ): Promise<void> {
    await this.enterFirstName.fill(firstName);
    await this.enterLastName.fill(lastName);
    await this.enterZipCode.fill(zipCode);
  }
  async clickOnContinue(): Promise<void> {
    await this.continueButton.click();
  }
  async getErrorMessage(): Promise<string | null> {
    return await this.errorMessage.textContent();
  }
  async clickOnCancel(): Promise<void> {
    await this.cancelButton.click();
  }
  async getPageTitle(): Promise<string | null> {
    return await this.pageTitle.textContent();
  }
  async getProductNameBeforeFinish(): Promise<string | null> {
    return await this.productNameBeforeFinish.first().textContent();
  }
  async clickOnFinish(): Promise<void> {
    await this.finishButton.click();
  }
  async getCompleteOrderMessage(): Promise<string | null> {
    return await this.orderMessage.textContent();
  }
}
