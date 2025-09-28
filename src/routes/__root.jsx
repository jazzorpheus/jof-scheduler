import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const RootLayout = () => {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/create", label: "Create New Event" },
    { to: "/select", label: "Select Availability" },
    { to: "/plan", label: "Plan Match" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <nav className="flex justify-center gap-6 p-4 bg-white shadow-sm rounded-b-lg">
        {navLinks.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            className="
              px-2 py-1 font-medium text-gray-700 text-center [&.active]:font-bold text-base min-[0px]:text-sm
              hover:text-blue-600 hover:border-b-2 hover:border-blue-400 transition
              [&.active]:text-blue-600 [&.active]:border-b-2 [&.active]:border-blue-600
            "
          >
            {label}
          </Link>
        ))}
      </nav>

      {/* Divider */}
      <hr className="my-2 border-gray-300" />

      {/* Page content */}
      <Outlet />

      {/* Devtools */}
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({ component: RootLayout });
