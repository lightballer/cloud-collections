import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("http://localhost:3001/files", () => {
    return HttpResponse.json([]);
  }),
];
