import { users } from "../test-data/users";
export const loginNegative = [
  {
    name: "Invalid Username and Password",
    username: users.invalidUsername,
    password: users.password,
    error: "sadface",
  },
  {
    name: "Empty username",
    username: "",
    password: users.password,
    error: "Username is required",
  },
  {
    name: "Empty password",
    username: users.validUsername,
    password: "",
    error: "Password is required",
  },
  {
    name: "Locked user validation",
    username: users.lockedUsername,
    password: users.password,
    error: "locked out",
  },
];
