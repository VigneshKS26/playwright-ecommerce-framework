import { test, expect } from "../../fixtures/fixtures";

import { users } from "../../test-data/users";
import { headers } from "../../test-data/headers";
import { invalidAuthData } from "../../test-data/auth";

import { validateBadCredentials } from "../../utils/assertions";

test("Generate Token", async ({ authAPI }) => {
  const response = await authAPI.authenticate(
    users.apiUsername,
    users.apiPassword,
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.token).toBeTruthy();
});

invalidAuthData.forEach((data) => {
  test(`Verify ${data.name}`, async ({ authAPI }) => {
    const response = await authAPI.authenticate(data.username, data.password);

    await validateBadCredentials(response, data);
  });
});

test("Verify Missing required fields", async ({ authAPI }) => {
  const response = await authAPI.authenticate();

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.reason).toContain("Bad credentials");
});

test("Verify Invalid content type", async ({ authAPI }) => {
  const response = await authAPI.authenticate(
    users.apiUsername,
    users.apiPassword,
    headers.invalidContentType,
  );

  expect(response.status()).toBe(400);

  const text = await response.text();

  expect(text).toContain("Bad Request");
});
