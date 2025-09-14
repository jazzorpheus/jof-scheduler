import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => (
  <>
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>{" "}
      <Link to="/create" className="[&.active]:font-bold bg-green-500">
        Create new event
      </Link>
      <Link to="/select" className="[&.active]:font-bold bg-blue-500">
        Select Availability
      </Link>
      <Link to="/plan" className="[&.active]:font-bold bg-red-500">
        Plan Match
      </Link>
    </div>
    <hr />
    <Outlet />
    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({ component: RootLayout });
