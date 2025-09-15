// Local Pages
import PlanMatchPage from "../pages/PlanMatchPage";

// TanStack Router
import { createFileRoute } from "@tanstack/react-router";

// Create route
export const Route = createFileRoute("/plan")({
  component: PlanMatchPage,
});
