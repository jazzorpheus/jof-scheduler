// React & React-Dom
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Styling
import "./index.css";

// Local Components
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
