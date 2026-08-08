import { headers } from "../../test-data/headers";
import { BaseAPI } from "./BaseAPI";

export class BookingAPI extends BaseAPI {
  constructor(request) {
    super(request);
  }
  async getAllBookings() {
    const response = await this.request.get(`${this.baseURL}/booking`);
    return response;
  }
  async getBookingUsingID(i) {
    const response = await this.request.get(`${this.baseURL}/booking/${i}`);
    return response;
  }
  async createBooking(payload) {
    const response = await this.request.post(`${this.baseURL}/booking/`, {
      data: payload,
    });
    return response;
  }

  async updateBooking(i, payload, headers = {}) {
    const response = await this.request.put(`${this.baseURL}/booking/${i}`, {
      data: payload,
      headers,
    });
    return response;
  }
  async partialUpdateBooking(i, payload, headers = {}) {
    const response = await this.request.patch(`${this.baseURL}/booking/${i}`, {
      data: payload,
      headers,
    });
    return response;
  }
  async deleteBooking(i, headers = {}) {
    return await this.request.delete(`${this.baseURL}/booking/${i}`, {
      headers,
    });
  }
}
