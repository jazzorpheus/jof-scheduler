import { http, HttpResponse } from "msw";
import { events } from "./data/events";

export const handlers = [
  http.get("/api/events", () => HttpResponse.json(events)),

  http.get("*", () => {
    console.warn(`[MSW] Unhandled GET request ignored.`);
  }),

  http.post("/api/events", async ({ request }) => {
    const formData = await request.json();

    const { title, description, startDate, endDate } = formData;

    // Minimal shape validation
    if (!title || !startDate || !endDate) {
      return HttpResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const newEvent = {
      id: crypto.randomUUID(),
      title,
      description: description ?? "",
      startDate,
      endDate,
    };

    events.push(newEvent);

    return HttpResponse.json(newEvent, { status: 201 });
  }),
];
