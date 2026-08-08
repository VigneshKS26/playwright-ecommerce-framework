import { BasePage } from "./BasePage";
export class CheckoutPage extends BasePage {
  constructor(page) {
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
  async clickOnCheckout() {
    await this.checkOutButton.click();
  }
  async enterYourInformation(firstName, lastName, zipCode) {
    await this.enterFirstName.fill(firstName);
    await this.enterLastName.fill(lastName);
    await this.enterZipCode.fill(zipCode);
  }
  async clickOnContinue() {
    await this.continueButton.click();
  }
  async getErrorMessage() {
    return await this.errorMessage.textContent();
  }
  async clickOnCancel() {
    await this.cancelButton.click();
  }
  async getPageTitle() {
    return await this.pageTitle.textContent();
  }
  async getProductNameBeforeFinish() {
    return await this.productNameBeforeFinish.textContent()
  }
  async clickOnFinish() {
    await this.finishButton.click();
  }
  async getCompleteOrderMessage() {
    return await this.orderMessage.textContent();
    
  }
}
