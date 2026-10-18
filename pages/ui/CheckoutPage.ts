import type { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  readonly checkOutButton: Locator = this.page.locator("#checkout");
  readonly enterFirstName: Locator = this.page.getByPlaceholder("First Name");
  readonly enterLastName: Locator = this.page.getByPlaceholder("Last Name");
  readonly enterZipCode: Locator =
    this.page.getByPlaceholder("Zip/Postal Code");
  readonly errorMessage: Locator = this.page.locator('[data-test="error"]');
  readonly cancelButton: Locator = this.page.getByRole("button", {
    name: "Cancel",
  });
  readonly continueButton: Locator = this.page.getByRole("button", {
    name: "Continue",
  });
  readonly pageTitle: Locator = this.page.locator(".title");
  readonly productNameBeforeFinish: Locator = this.page.locator(
    ".inventory_item_name",
  );
  readonly finishButton: Locator = this.page.getByRole("button", {
    name: "Finish",
  });
  readonly orderMessage: Locator = this.page.locator(".complete-header");

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
