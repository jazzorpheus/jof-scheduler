import { createContext, useState, useEffect, useContext } from "react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

// ! ************************************************************************** THEME-ING!

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check for saved theme in localStorage, fallback to system preference
    const storedTheme = localStorage.getItem("theme");
    const userPrefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    // ! Temporarily disabled light theme
    // return storedTheme || (userPrefersDark ? "dark" : "light");
    return "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    // ! Temporarily disabled light theme
    // setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    setTheme("dark");
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

const SunIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);

const MoonIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
);

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-0 right-0 p-2 z-50 scale-75 rounded-full text-gray-600 hover:bg-gray-300 dark:text-white dark:bg-jof-blue-900 dark:hover:bg-blue-800"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

// ! ************************************************************************** ROUTING

const RootLayout = () => {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/create", label: "Create Event" },
    { to: "/view", label: "View Events" },
    { to: "/select", label: "Select Availability" },
    { to: "/plan", label: "Plan Match" },
  ];

  return (
    <ThemeProvider>
      <div className="dark:bg-jof-blue-900">
        {/* NAVBAR */}
        <nav className="flex justify-center items-center gap-6 p-4 bg-white dark:bg-jof-blue-700 shadow-sm mb-3">
          {navLinks.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="
              px-2 py-1 font-medium text-gray-700 text-sm sm:text-base md:text-md text-center hover:border-b-2 
              hover:border-jof-blue-light [&.active]:text-white [&.active]:border-b-2 [&.active]:border-jof-blue-light 
              dark:text-jof-blue-light dark:[&.active]:text-white dark:hover:text-white dark:hover:border-jof-blue-light"
            >
              {label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>

        {/* Divider */}
        {/* <hr className="mt-2 py-2 border-gray-300 dark:border-white dark:bg-jof-blue-900" /> */}

        {/* Page content */}
        <Outlet />

        {/* Devtools */}
        <TanStackRouterDevtools />
      </div>
    </ThemeProvider>
  );
};

export const Route = createRootRoute({ component: RootLayout });
