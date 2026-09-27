import { expect } from "@playwright/test";

export async function validateBadCredentials(response, testData) {
  expect(response.status()).toBe(testData.status);

  const body = await response.json();

  expect(body.reason).toContain(testData.reason);
}
