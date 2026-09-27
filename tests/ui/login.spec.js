import { test, expect } from "../../fixtures/fixtures";
import { users } from "../../test-data/users";
import { loginNegative } from "../../test-data/loginNegative";
test.beforeEach("Launch Site", async ({ loginPage }) => {
  console.log("Launching site...");
  await loginPage.launchSite();
});

test("Successful Login With User1", async ({ loginPage }) => {
  console.log("Verifying Valid Credentials 1");
  await loginPage.loginUser(users.validUsername, users.password);
  const title = await loginPage.getTitle();
  expect(title).toContain("Products");
  await loginPage.logout();
});

test("Successful Login With User2", async ({ loginPage }) => {
  console.log("Verifying Valid Credentials 2");
  await loginPage.loginUser(users.secondUsername, users.password);
});

loginNegative.forEach((data) => {
  test(`${data.name}`, async ({ loginPage }) => {
    console.log("Verifying Invalid Credentials");
    await loginPage.loginUser(data.username, data.password);
    const error = await loginPage.getErrorMessage();
    expect(error).toContain(data.error);
  });
});
