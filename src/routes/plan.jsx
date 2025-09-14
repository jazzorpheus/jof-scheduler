// TanStack Router
import { createFileRoute } from "@tanstack/react-router";

// Create route
export const Route = createFileRoute("/plan")({
  component: PlanMatch,
});

// Route component
function PlanMatch() {
  return <div className="p-2">Hello from Plan Match!</div>;
}
