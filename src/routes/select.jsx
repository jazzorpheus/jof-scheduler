// Local Pages
import SelectAvailabilityPage from "../pages/SelectAvailabilityPage";

// TanStack Router
import { createFileRoute } from "@tanstack/react-router";

// Create route & use imported page as component
export const Route = createFileRoute("/select")({
  component: SelectAvailabilityPage,
});
