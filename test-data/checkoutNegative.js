export const checkoutNegativeData = [
  {
    name: "empty firstname",
    firstName: "",
    lastName: "one",
    zipCode: "12345",
    error: "First Name is required",
  },
  {
    name: "empty lastname",
    firstName: "first",
    lastName: "",
    zipCode: "12345",
    error: "Last Name is required",
  },
  {
    name: "empty zip code",
    firstName: "first",
    lastName: "last",
    zipCode: "",
    error: "Postal Code is required",
  },
];
