import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/plan")({
  component: PlanMatch,
});

function PlanMatch() {
  return <div className="p-2">Hello from Plan Match!</div>;
}
