export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async launchSite() {
    await this.page.goto("/");
  }
}
