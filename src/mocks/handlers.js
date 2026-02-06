import { http, HttpResponse } from "msw";
import { events } from "./data/events";

export const handlers = [
  http.get("/api/events", () => HttpResponse.json(events)),
];
