import type { Page } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  async launchSite(): Promise<void> {
    await this.page.goto("/");
  }
}
