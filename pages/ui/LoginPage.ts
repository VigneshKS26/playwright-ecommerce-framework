import type { Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly inputUsername: Locator = this.page.getByPlaceholder("Username");
  readonly inputPassword: Locator = this.page.getByPlaceholder("Password");
  readonly loginButton: Locator = this.page.getByRole("button", {
    name: "Login",
  });
  readonly menuButton: Locator = this.page.locator("#react-burger-menu-btn");
  readonly logoutOption: Locator = this.page.getByText("Logout");
  readonly errorMessage: Locator = this.page.locator('[data-test="error"]');
  readonly pageTitle: Locator = this.page.locator(".title");

  async loginUser(username: string, password: string): Promise<void> {
    await this.inputUsername.fill(username);
    await this.inputPassword.fill(password);
    await this.loginButton.click();
  }
  async getTitle(): Promise<string | null> {
    return await this.pageTitle.textContent();
  }
  async getErrorMessage(): Promise<string | null> {
    return await this.errorMessage.textContent();
  }
  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutOption.click();
  }

  /* async loginUser2() {
    await this.inputUsername.fill("visual_user");
    await this.inputPassword.fill("secret_sauce");
    await this.loginButton.click();
  }
  async verifyInvalidCredentials() {
    await this.inputUsername.fill("invalid user");
    await this.inputPassword.fill("secret_sauce");
    await this.loginButton.click();
    return await this.errorMessage.textContent();
  }
  
  async verifyEmptyUsername() {
    await this.inputPassword.fill("secret_sauce");
    await this.loginButton.click();
    return await this.errorMessage.textContent();
  }
  async verifyEmptyPassword() {
    await this.inputUsername.fill("standard_user");
    await this.loginButton.click();
    return await this.errorMessage.textContent();
  }
  async verifyLockedUser() {
    await this.inputUsername.fill("locked_out_user");
    await this.inputPassword.fill("secret_sauce");
    await this.loginButton.click();
    return await this.errorMessage.textContent();
  } */
}
