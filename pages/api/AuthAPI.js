import { BaseAPI } from "./BaseAPI";

export class AuthAPI extends BaseAPI {
  constructor(request) {
    super(request);
  }

  async authenticate(username, password, headers = {}) {
    return await this.request.post(`${this.baseURL}/auth`, {
      data: {
        username,
        password,
      },
      headers,
    });
  }
  async getAuth(username, password) {
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
