import { payload } from "./payload";

export const createBookingNegativeData = [
  {
    name: "without firstname",
    payload: (() => {
      const pld: Record<string, unknown> = { ...payload };
      delete pld.firstname;
      return pld;
    })(),
    status: 500,
  },

  {
    name: "without lastname",
    payload: (() => {
      const pld: Record<string, unknown> = { ...payload };
      delete pld.lastname;
      return pld;
    })(),
    status: 500,
  },

  {
    name: "empty payload",
    payload: {},
    status: 500,
  },
] as const;
