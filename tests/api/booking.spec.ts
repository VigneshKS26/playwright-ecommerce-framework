import { test, expect } from "../../fixtures/fixtures";
import { headers } from "../../test-data/headers";
import { createBookingNegativeData } from "../../test-data/createBookingNegative";
import { payload } from "../../test-data/payload";

interface BookingIdRecord {
  bookingid: number;
}

interface BookingDetails {
  [field: string]: unknown;
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: {
    checkin: string;
    checkout: string;
  };
  additionalneeds: string;
}

interface CreatedBookingResponse {
  bookingid: number;
  booking: BookingDetails;
}

interface MutableBookingPayload {
  [field: string]: unknown;
  bookingdates: Record<string, unknown>;
}

test.describe("Get Booking", () => {
  test("Get all bookings", async ({ bookingAPI }) => {
    const response = await bookingAPI.getAllBookings();
    expect(response.status()).toBe(200);
    const responseBody: BookingIdRecord[] = await response.json();
    //console.log(responseBody);
    responseBody.forEach((body) => expect(body).toHaveProperty("bookingid"));
  });

  test("Get booking using valid booking ID", async ({ bookingAPI }) => {
    const response = await bookingAPI.getBookingUsingID(5);
    expect(response.status()).toBe(200);
    const responseBody: unknown = await response.json();
    console.log(responseBody);
    expect(responseBody).toBeTruthy();
  });

  test("Get booking using invalid booking ID", async ({ bookingAPI }) => {
    const response = await bookingAPI.getBookingUsingID(999999);
    expect(response.status()).toBe(404);
  });

  test("Get booking using non-existing booking ID", async ({ bookingAPI }) => {
    const response = await bookingAPI.getBookingUsingID("abc");
    expect(response.status()).toBe(404);
  });
});

test.describe("Create Booking", () => {
  test("Create booking with valid data", async ({ bookingAPI }) => {
    const response = await bookingAPI.createBooking(payload);
    expect(response.status()).toBe(200);
    const responseBody: CreatedBookingResponse = await response.json();
    //console.log(responseBody);
    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody).toHaveProperty("booking");
  });

  createBookingNegativeData.forEach((data) => {
    test(`Create booking ${data.name}`, async ({ bookingAPI }) => {
      const response = await bookingAPI.createBooking(data.payload);
      expect(response.status()).toBe(data.status);
    });
  });

  test("Create booking with invalid date format", async ({ bookingAPI }) => {
    const pld = {
      ...payload,
      bookingdates: {
        ...payload.bookingdates,
        checkin: "20th July 2020",
      },
    };

    const response = await bookingAPI.createBooking(pld);
    expect(response.status()).toBe(200);
  });

  test("Create booking with negative total price", async ({ bookingAPI }) => {
    const pld = { ...payload, totalprice: -100 };
    const response = await bookingAPI.createBooking(pld);

    expect(response.status()).toBe(200);
    //const responseBody = await response.json();
    //console.log(responseBody);
  });
  test("Create booking with total price as string", async ({ bookingAPI }) => {
    const pld = { ...payload, totalprice: "abc" };
    const response = await bookingAPI.createBooking(pld);

    expect(response.status()).toBe(200);
    const responseBody: unknown = await response.json();
    //console.log(responseBody);
    //it accepted string and using null
  });

  test("Create booking with null values", async ({ bookingAPI }) => {
    const pld: MutableBookingPayload = { ...payload };

    pld.firstname = null;
    pld.lastname = null;
    pld.totalprice = null;
    pld.depositpaid = null;
    pld.additionalneeds = null;

    pld.bookingdates = {
      ...pld.bookingdates,
      checkin: null,
      checkout: null,
    };

    const response = await bookingAPI.createBooking(pld);
    expect(response.status()).toBe(500);
  });

  test("Create booking with additional string", async ({ bookingAPI }) => {
    const pld = { ...payload, country: "USA" };
    const response = await bookingAPI.createBooking(pld);
    expect(response.status()).toBe(200);
    //console.log(await response.json());
  });
});

test.describe("Update Booking", () => {
  test("Update complete booking", async ({ authHeader, bookingAPI }) => {
    const pld: BookingDetails = { ...payload };
    pld.firstname = "James";
    pld.totalprice = 1111;
    const response = await bookingAPI.updateBooking(8, pld, authHeader);

    expect(response.status()).toBe(200);
    const responseBody: BookingDetails = await response.json();
    console.log(responseBody);
    expect(responseBody.firstname).toBe("James");
    expect(responseBody.totalprice).toBe(1111);
  });

  test("Update complete booking with Invalid token", async ({ bookingAPI }) => {
    const pld = { ...payload };
    const hdr = headers.cookie("token");
    const response = await bookingAPI.updateBooking(8, pld, hdr);
    expect(response.status()).toBe(403);
  });

  test("Update complete booking with Missing token", async ({ bookingAPI }) => {
    const pld = { ...payload };
    const hdr = headers.cookie("");
    const response = await bookingAPI.updateBooking(8, pld, hdr);
    expect(response.status()).toBe(403);
  });

  test("Update complete booking with Invalid booking ID", async ({
    authHeader,
    bookingAPI,
  }) => {
    const pld: BookingDetails = { ...payload };

    pld.firstname = "James";
    pld.totalprice = 1111;
    const response = await bookingAPI.updateBooking("abc", pld, authHeader);
    expect(response.status()).toBe(405);
  });

  test("Update complete booking with Non-existing booking ID", async ({
    bookingAPI,
    authHeader,
  }) => {
    const pld: BookingDetails = { ...payload };

    pld.firstname = "James";
    pld.totalprice = 1111;
    const response = await bookingAPI.updateBooking(0, pld, authHeader);
    expect(response.status()).toBe(405);
  });

  test("Update complete booking with Empty payload", async ({
    bookingAPI,
    authHeader,
  }) => {
    const pld = {};

    const response = await bookingAPI.updateBooking(8, pld, authHeader);
    expect(response.status()).toBe(400);
  });

  test("Update complete booking with Invalid payload", async ({
    bookingAPI,
    authHeader,
  }) => {
    const pld: Record<string, unknown> = { ...payload };

    pld.firstname = 123;
    pld.totalprice = 111;
    const response = await bookingAPI.updateBooking(8, pld, authHeader);

    /* const response = await request.put(
    "https://restful-booker.herokuapp.com/booking/6",
    {
      data: {
        firstname: 123,
        lastname: 111,
        totalprice: "1111",
        depositpaid: 0,
        bookingdates: {
          checkin: "2018-01-01",
          checkout: "2019-01-01",
        },
        additionalneeds: "Breakfast",
      },
      headers: {
        Cookie: `token=${token}`,
      },
    },
  ); */
    expect(response.status()).toBe(500);
  });
});

test.describe("Partial update Booking", () => {
  test("Update firstname", async ({ authHeader, bookingAPI }) => {
    const pld: Pick<BookingDetails, "firstname"> = {
      firstname: payload.firstname,
    };

    pld.firstname = "Test";

    const response = await bookingAPI.partialUpdateBooking(5, pld, authHeader);

    expect(response.status()).toBe(200);
    const responseBody: Pick<BookingDetails, "firstname"> =
      await response.json();
    //console.log(responseBody);
    expect(responseBody.firstname).toBe("Test");
  });

  test("Update lastname", async ({ authHeader, bookingAPI }) => {
    const pld: Pick<BookingDetails, "lastname"> = {
      lastname: payload.lastname,
    };

    pld.lastname = "Test";

    const response = await bookingAPI.partialUpdateBooking(5, pld, authHeader);

    expect(response.status()).toBe(200);
    const responseBody: Pick<BookingDetails, "lastname"> =
      await response.json();
    //console.log(responseBody);
    expect(responseBody.lastname).toBe("Test");
  });

  test("Update Invalid booking ID", async ({ authHeader, bookingAPI }) => {
    const pld: Pick<BookingDetails, "lastname"> = {
      lastname: payload.lastname,
    };

    pld.lastname = "Test";

    const response = await bookingAPI.partialUpdateBooking(
      "abcd",
      pld,
      authHeader,
    );
    expect(response.status()).toBe(405);
  });
});

test("Delete existing booking", async ({ authHeader, bookingAPI }) => {
  const createResponse = await bookingAPI.createBooking(payload);
  expect(createResponse.status()).toBe(200);

  const createdBooking: CreatedBookingResponse = await createResponse.json();

  const bookingId = createdBooking.bookingid;
  expect(bookingId).toBeTruthy();

  const response = await bookingAPI.deleteBooking(bookingId, authHeader);
  expect(response.status()).toBe(201);
});

test("Delete already deleted booking", async ({ authHeader, bookingAPI }) => {
  const createResponse = await bookingAPI.createBooking(payload);
  expect(createResponse.status()).toBe(200);

  const createdBooking: CreatedBookingResponse = await createResponse.json();

  const bookingId = createdBooking.bookingid;
  expect(bookingId).toBeTruthy();

  const response1 = await bookingAPI.deleteBooking(bookingId, authHeader);
  expect(response1.status()).toBe(201);

  const response2 = await bookingAPI.deleteBooking(bookingId, authHeader);
  expect(response2.status()).toBe(405);
});

test("Delete invalid booking ID", async ({ authHeader, bookingAPI }) => {
  const response = await bookingAPI.deleteBooking("abcd", authHeader);
  expect(response.status()).toBe(405);
});
