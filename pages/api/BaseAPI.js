export class BaseAPI {
  constructor(request) {
    this.request = request;
    this.baseURL = process.env.API_BASE_URL;
  }
}
