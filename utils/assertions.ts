import { expect } from "@playwright/test";
import type { APIResponse } from "@playwright/test";

interface BadCredentialsTestData {
  status: number;
  reason: string;
}

export async function validateBadCredentials(
  response: APIResponse,
  testData: BadCredentialsTestData,
): Promise<void> {
  expect(response.status()).toBe(testData.status);

  const body: { reason: string } = await response.json();

  expect(body.reason).toContain(testData.reason);
}
