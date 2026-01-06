import { http, HttpResponse } from "msw";

export const handleAuth = [
  http.post("*/api/users/login", () => {
    return HttpResponse.json(
      {
        user: {
          id: "mock-user-id",
          email: "456789@gmail.com",
          password: "456789",
        },
      },
      { status: 200 }
    );
  }),
];
