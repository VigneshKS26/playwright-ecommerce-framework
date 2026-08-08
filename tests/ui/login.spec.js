import { test, expect } from "../../fixtures/fixtures";
import { users } from "../../test-data/users";

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

test("Invalid Username and Password", async ({ loginPage }) => {
  console.log("Verifying Invalid Credentials");
  await loginPage.loginUser(users.invalidUsername, users.password);
  /* const error = await loginPage.verifyInvalidCredentials(); */
  const error = await loginPage.getErrorMessage();
  expect(error).toContain("sadface");
});

test("Empty username", async ({ loginPage }) => {
  console.log("Verifying Empty username");
  await loginPage.loginUser("", users.password);
  const error = await loginPage.getErrorMessage();
  expect(error).toContain("Username is required");
});

test("Empty password", async ({ loginPage }) => {
  console.log("Verifying Empty password");
  await loginPage.loginUser(users.validUsername, "");
  const error = await loginPage.getErrorMessage();
  expect(error).toContain("Password is required");
});

test("Locked user validation", async ({ loginPage }) => {
  console.log("Verifying Locked user");
  await loginPage.loginUser(users.lockedUsername, users.password);
  const error = await loginPage.getErrorMessage();
  expect(error).toContain("locked out");
});
