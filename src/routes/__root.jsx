// TanStack Router
import { Outlet, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

// Root Route
export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* NAV */}
      {/* <nav className="p-4 flex gap-4 bg-slate-100">
        <Link to="/">Create Event</Link>
        <Link to="/availability">Select Availability</Link>
        <Link to="/plan/$eventId">Plan Match</Link>
      </nav> */}

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <Outlet /> {/* routed pages render here */}
      </main>

      <TanStackRouterDevtools />
    </div>
  );
}
