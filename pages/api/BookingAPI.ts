import type { APIRequestContext, APIResponse } from "@playwright/test";
import { headers } from "../../test-data/headers";
import { BaseAPI } from "./BaseAPI";

export class BookingAPI extends BaseAPI {
  constructor(request: APIRequestContext) {
    super(request);
  }

  async getAllBookings(): Promise<APIResponse> {
    const response = await this.request.get(`${this.baseURL}/booking`);
    return response;
  }
  async getBookingUsingID(i: number | string): Promise<APIResponse> {
    const response = await this.request.get(`${this.baseURL}/booking/${i}`);
    return response;
  }
  async createBooking(payload: Record<string, unknown>): Promise<APIResponse> {
    const response = await this.request.post(`${this.baseURL}/booking/`, {
      data: payload,
    });
    return response;
  }

  async updateBooking(
    i: number | string,
    payload: Record<string, unknown>,
    headers: Record<string, string> = {},
  ): Promise<APIResponse> {
    const response = await this.request.put(`${this.baseURL}/booking/${i}`, {
      data: payload,
      headers,
    });
    return response;
  }
  async partialUpdateBooking(
    i: number | string,
    payload: Record<string, unknown>,
    headers: Record<string, string> = {},
  ): Promise<APIResponse> {
    const response = await this.request.patch(`${this.baseURL}/booking/${i}`, {
      data: payload,
      headers,
    });
    return response;
  }
  async deleteBooking(
    i: number | string,
    headers: Record<string, string> = {},
  ): Promise<APIResponse> {
    return await this.request.delete(`${this.baseURL}/booking/${i}`, {
      headers,
    });
  }
}
