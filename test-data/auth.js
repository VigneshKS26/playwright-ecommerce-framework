import { users } from "./users";

export const invalidAuthData = [
  {
    name: "Invalid username",
    username: users.invalidUsername,
    password: users.apiPassword,
    status: 200,
    reason: "Bad credentials",
  },

  {
    name: "Invalid password",
    username: users.apiUsername,
    password: users.invalidPassword,
    status: 200,
    reason: "Bad credentials",
  },

  {
    name: "Invalid username and password",
    username: users.invalidUsername,
    password: users.invalidPassword,
    status: 200,
    reason: "Bad credentials",
  },

  {
    name: "Empty request body",
    username: users.emptyField,
    password: users.emptyField,
    status: 200,
    reason: "Bad credentials",
  },
];
