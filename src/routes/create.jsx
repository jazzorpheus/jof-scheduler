import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/create")({
  component: Create,
});

function Create() {
  return <div className="p-2">Hello from Create!</div>;
}
