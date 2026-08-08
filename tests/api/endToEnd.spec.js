import { test, expect } from "../../fixtures/fixtures";
import { users } from "../../test-data/users";
import { payload } from "../../test-data/payload";
import { headers } from "../../test-data/headers";

test("End to end API testing", async ({ authAPI, bookingAPI }) => {
  let token;
  let bookingId;
  let cookie;

  await test.step("Generate authentication token", async () => {
    const authResponse = await authAPI.authenticate(
      users.apiUsername,
      users.apiPassword,
    );

    expect(authResponse.status()).toBe(200);

    const authResponseBody = await authResponse.json();

    token = authResponseBody.token;

    expect(token).toBeTruthy();
  });

  await test.step("Create booking", async () => {
    const createBookingResponse = await bookingAPI.createBooking(payload);

    expect(createBookingResponse.status()).toBe(200);

    const createBookingBody = await createBookingResponse.json();

    bookingId = createBookingBody.bookingid;

    expect(createBookingBody).toHaveProperty("bookingid");
    expect(createBookingBody).toHaveProperty("booking");

    expect(createBookingBody.booking.firstname).toBe("QA");
    expect(createBookingBody.booking.lastname).toBe("Tester");
    expect(createBookingBody.booking.totalprice).toBe(555);

    cookie = headers.cookie(token);
  });

  await test.step("Update booking", async () => {
    const pld = { ...payload };

    pld.firstname = "Yuki";
    pld.lastname = "Gai";
    pld.totalprice = 1234;
    pld.depositpaid = false;
    pld.additionalneeds = "Dinner";

    const updatedResponse = await bookingAPI.updateBooking(
      bookingId,
      pld,
      cookie,
    );

    expect(updatedResponse.status()).toBe(200);

    const updatedResponseBody = await updatedResponse.json();

    expect(updatedResponseBody.firstname).toBe("Yuki");
    expect(updatedResponseBody.totalprice).toBe(1234);
    expect(updatedResponseBody.depositpaid).toBe(false);
    expect(updatedResponseBody.additionalneeds).toBe("Dinner");
  });

  await test.step("Partially update booking", async () => {
    const pld1 = {
      lastname: "Gim",
    };

    const parUpresponse = await bookingAPI.partialUpdateBooking(
      bookingId,
      pld1,
      cookie,
    );

    expect(parUpresponse.status()).toBe(200);

    const parUpresponseBody = await parUpresponse.json();

    expect(parUpresponseBody.lastname).toBe("Gim");
  });

  await test.step("Delete booking", async () => {
    const delResponse = await bookingAPI.deleteBooking(bookingId, cookie);

    expect(delResponse.status()).toBe(201);
  });

  await test.step("Verify deleted booking", async () => {
    const getBookingResponse = await bookingAPI.getBookingUsingID(bookingId);

    expect(getBookingResponse.status()).toBe(404);
  });
});

/* import { test, expect } from "../../fixtures/fixtures";
import { users } from "../../test-data/users";
import { payload } from "../../test-data/payload";
import { headers } from "../../test-data/headers";
test("End to end API testing", async ({ authAPI, bookingAPI }) => {
  await test.step("Generating token", async () => {
    const authResponse = await authAPI.authenticate(
      users.apiUsername,
      users.apiPassword,
    );
    expect(authResponse.status()).toBe(200);

    const authResponseBody = await authResponse.json();

    const token = authResponseBody.token;
    expect(token).toBeTruthy();
  });

  console.log("Creating Booking");
  const createBookingResponse = await bookingAPI.createBooking(payload);
  expect(createBookingResponse.status()).toBe(200);
  const createBookingBody = await createBookingResponse.json();
  const bookingId = createBookingBody.bookingid;
  console.log(createBookingBody);
  expect(createBookingBody).toHaveProperty("bookingid");
  expect(createBookingBody).toHaveProperty("booking");
  expect(createBookingBody.booking.firstname).toBe("QA");
  expect(createBookingBody.booking.lastname).toBe("Tester");
  expect(createBookingBody.booking.totalprice).toBe(555);

  console.log("Updating Booking");
  const pld = { ...payload };
  const pld1 = {
    ...payload,
    lastname: "Gim",
  };
  pld.firstname = "Yuki";
  pld.lastname = "Gai";
  pld.totalprice = 1234;
  pld.depositpaid = false;
  pld.additionalneeds = "Dinner";
  const cookie = headers.cookie(token);
  const updatedResponse = await bookingAPI.updateBooking(
    bookingId,
    pld,
    cookie,
  );

  expect(updatedResponse.status()).toBe(200);
  const updatedResponseBody = await updatedResponse.json();
  console.log(updatedResponseBody);
  expect(updatedResponseBody.firstname).toBe("Yuki");
  expect(updatedResponseBody.totalprice).toBe(1234);
  expect(updatedResponseBody.depositpaid).toBe(false);
  expect(updatedResponseBody.additionalneeds).toBe("Dinner");

  console.log("Partially Updating Booking");
  const parUpresponse = await bookingAPI.partialUpdateBooking(
    bookingId,
    pld1,
    cookie,
  );

  expect(parUpresponse.status()).toBe(200);
  const parUpresponseBody = await parUpresponse.json();
  console.log(parUpresponseBody);
  expect(parUpresponseBody.lastname).toBe("Gim");

  console.log("Deleting Booking");
  const delResponse = await bookingAPI.deleteBooking(bookingId, cookie);
  expect(delResponse.status()).toBe(201);

  console.log("Verifying deleted booking");
  const getBookingResponse = await bookingAPI.getBookingUsingID(bookingId);

  expect(getBookingResponse.status()).toBe(404);
});
 */
