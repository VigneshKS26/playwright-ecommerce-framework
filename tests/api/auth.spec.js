import { test, expect } from "../../fixtures/fixtures";
import { users } from "../../test-data/users";
import { headers } from "../../test-data/headers";

test("Generate Token", async ({ authAPI }) => {
  const response = await authAPI.authenticate(
    users.apiUsername,
    users.apiPassword,
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.token).toBeTruthy();
});

test("Verify Invalid username", async ({ authAPI }) => {
  const response = await authAPI.authenticate(
    users.invalidUsername,
    users.apiPassword,
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.reason).toContain("Bad credentials");
});

test("Verify Invalid password", async ({ authAPI }) => {
  const response = await authAPI.authenticate(
    users.apiUsername,
    users.invalidPassword,
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.reason).toContain("Bad credentials");
});

test("Verify Invalid username and password", async ({ authAPI }) => {
  const response = await authAPI.authenticate(
    users.invalidUsername,
    users.invalidPassword,
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.reason).toContain("Bad credentials");
});

test("Verify Empty request body", async ({ authAPI }) => {
  const response = await authAPI.authenticate(
    users.emptyField,
    users.emptyField,
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.reason).toContain("Bad credentials");
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
