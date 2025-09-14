// React & React-Dom
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Styling
import "./index.css";

// Local Components
import App from "./App.jsx";

// TanStack Router
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
const router = createRouter({ routeTree });

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> WAS HERE */}
    <RouterProvider router={router} />
  </StrictMode>
);
