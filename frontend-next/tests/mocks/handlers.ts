// @ts-nocheck

import { http, HttpResponse } from "msw";

export const successHandlers = [
  http.get("http://localhost:3001/files", () => {
    return HttpResponse.json([]);
  }),
  http.get("http://localhost:3001/files/*/raw", ({ params }) => {
    return HttpResponse.arrayBuffer(new ArrayBuffer(3));
  }),
  http.post("http://localhost:3001/files/*", ({}) => {
    return HttpResponse.json();
  }),
  http.delete("http://localhost:3001/files/*", ({}) => {
    return HttpResponse.json({ message: "ok" });
  }),
  http.patch("http://localhost:3001/files/*", ({}) => {
    return HttpResponse.json({});
  }),
];

export const failHandlers = [
  http.get("http://localhost:3001/files", () => {
    return new HttpResponse(null, { status: 404 });
  }),
  http.get("http://localhost:3001/files/1/raw", () => {
    return new HttpResponse(null, { status: 404 });
  }),
  http.post("http://localhost:3001/files/*", ({}) => {
    return new HttpResponse(null, { status: 400 });
  }),
  http.patch("http://localhost:3001/files/*", ({}) => {
    return new HttpResponse(null, { status: 400 });
  }),
];
