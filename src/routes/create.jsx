// Local Pages
import CreateEventPage from "../pages/CreateEventPage";

// TanStack Router
import { createFileRoute } from "@tanstack/react-router";

// Create route
export const Route = createFileRoute("/create")({
  component: CreateEventPage,
});
