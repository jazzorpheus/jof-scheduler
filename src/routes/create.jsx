import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create")({
  component: CreateEvent,
});

function CreateEvent() {
  return <div className="p-2">Hello from Create Event!</div>;
}
