import { createFileRoute } from "@tanstack/react-router";

import App from "../App";

export const Route = createFileRoute("/select")({
  component: Select,
});

function Select() {
  return <App />;
}
