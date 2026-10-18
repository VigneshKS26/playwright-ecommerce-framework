import type { APIResponse } from "@playwright/test";
import { BaseAPI } from "./BaseAPI";

export class AuthAPI extends BaseAPI {
  async authenticate(
    username?: string,
    password?: string,
    headers: Record<string, string> = {},
  ): Promise<APIResponse> {
    return await this.request.post(`${this.baseURL}/auth`, {
      data: {
        username,
        password,
      },
      headers,
    });
  }
  async getAuth(username: string, password: string): Promise<string> {
    const response = await this.request.post(`${this.baseURL}/auth`, {
      data: {
        username,
        password,
      },
    });
    const responsebody = await response.json();
    const token = responsebody.token;
    return token;
  }
}
