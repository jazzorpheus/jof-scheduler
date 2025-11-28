// Local Pages
import ViewEventsPage from "../pages/ViewEventsPage";

// TanStack Router
import { createFileRoute } from "@tanstack/react-router";

// Create route
export const Route = createFileRoute("/view")({
  component: ViewEventsPage,
});
