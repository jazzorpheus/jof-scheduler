// React & React-Dom
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Styling
import "./index.css";

// TanStack Router
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Context Provider (for locale + timezone)
import { LocaleProvider } from "./utils/lib/LocaleContext";

// Import Loading component
import Loading from "./components/Loading";

// --- Create router instance ---
const router = createRouter({
  routeTree,
  defaultPendingComponent: Loading,
  defaultPendingMs: 0,
});

// --- Render App with LocaleProvider ---
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LocaleProvider>
      <RouterProvider router={router} />
    </LocaleProvider>
  </StrictMode>
);
