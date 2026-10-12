export const headers = {
  invalidContentType: {
    "Content-Type": "application/xml",
  },

  validJson: {
    "Content-Type": "application/json",
  },

  cookie: (token: string) => ({
    Cookie: `token=${token}`,
  }),
} as const;
