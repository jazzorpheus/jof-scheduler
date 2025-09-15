// Local Pages
import HomePage from "../pages/HomePage";

// TanStack Router
import { createFileRoute } from "@tanstack/react-router";

// Create route
export const Route = createFileRoute("/")({
  component: HomePage,
});
