import type { APIRequestContext } from "@playwright/test";

export class BaseAPI {
  protected baseURL: string | undefined;

  constructor(protected request: APIRequestContext) {
    this.baseURL = process.env.API_BASE_URL;
  }
}
