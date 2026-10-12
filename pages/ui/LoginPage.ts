import type { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  inputUsername: Locator;
  inputPassword: Locator;
  loginButton: Locator;
  menuButton: Locator;
  logoutOption: Locator;
  errorMessage: Locator;
  pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.inputUsername = page.getByPlaceholder("Username");
    this.inputPassword = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.menuButton = page.locator("#react-burger-menu-btn");
    this.logoutOption = page.getByText("Logout");
    this.errorMessage = page.locator('[data-test="error"]');
    this.pageTitle = page.locator(".title");
  }

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
