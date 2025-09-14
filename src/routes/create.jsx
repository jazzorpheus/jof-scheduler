// TanStack Router
import { createFileRoute } from "@tanstack/react-router";

// Create route
export const Route = createFileRoute("/create")({
  component: CreateEvent,
});

// Route Component
function CreateEvent() {
  return <div className="p-2">Hello from Create Event!</div>;
}
