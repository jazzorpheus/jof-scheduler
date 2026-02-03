import { createContext, useState, useEffect, useContext } from "react";
import {
  createRootRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Menu, X } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "motion/react";

// ! ************************************************************************** THEME-ING!

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Check for saved theme in localStorage, default to dark theme
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || "dark";
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
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
  const [isHovered, setIsHovered] = useState(false);

  const isLight = theme === "light";
  const showMoon = isLight ? isHovered : !isHovered;

  return (
    <button
      onClick={toggleTheme}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Toggle theme"
      className={`
        fixed top-0 right-0 p-2 z-50 scale-75 rounded-full
        ${isLight ? "text-slate-700" : "dark:text-gray-400"}
        ${isHovered && isLight ? "hover:bg-jof-blue-700 hover:text-slate-200" : ""}
        ${isHovered && !isLight ? "dark:hover:text-black dark:hover:bg-slate-300" : ""}
      `}
    >
      {showMoon ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

// ! ************************************************************************** ROUTING

const RootLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navLinks = [
    { to: "/create", label: "Create Event" },
    { to: "/view", label: "View Events" },
    { to: "/select", label: "Select Availability" },
    { to: "/plan", label: "Plan Match" },
  ];

  return (
    <ThemeProvider>
      <div className="bg-slate-400 dark:bg-jof-blue-900 min-h-screen relative">
        {/* NAVBAR */}
        {location.pathname !== "/" && (
          <nav className="flex justify-between shadow-lg min-[571px]:justify-center items-center min-[571px]:gap-6 p-4 bg-slate-300 dark:bg-jof-blue-700 mb-3 relative">
            {/* Home Icon */}
            <Link
              to="/"
              className="hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.5)] dark:hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
            >
              <img src="/jof_icon.ico" alt="Home" className="w-8 h-8" />
            </Link>

            {/* Desktop Links (> 570px) */}
            <div className="hidden min-[571px]:flex items-center gap-6">
              {navLinks.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="
                px-2 py-1 font-medium text-gray-700 text-sm sm:text-base md:text-md text-center 
                border-b-2 border-transparent hover:border-b-2 hover:border-jof-blue-light 
                [&.active]:text-slate-900 [&.active]:border-b-2 [&.active]:border-blue-500 
                dark:text-jof-blue-light dark:[&.active]:text-white dark:[&.active]:border-jof-blue-light dark:hover:text-white dark:hover:border-jof-blue-light"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Mobile Hamburger (<= 570px) */}
            <div className="block min-[571px]:hidden mr-8">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-700 dark:text-white hover:bg-gray-100 dark:bg-jof-blue-900 rounded-md"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute border-t top-full left-0 right-0 bg-slate-300 dark:bg-jof-blue-900 shadow-lg dark:border-jof-blue-light z-50 flex flex-col overflow-hidden min-[571px]:hidden"
                >
                  <div className="flex flex-col p-4 gap-2">
                    {navLinks.map(({ to, label }) => (
                      <Link
                        key={to}
                        to={to}
                        onClick={() => setIsOpen(false)}
                        className="
                      px-4 py-3 font-medium text-gray-700 text-left rounded-2xl
                      [&.active]:border-l-4 [&.active]:border-slate-600 [&.active]:dark:border-jof-blue-light
                      dark:text-jof-blue-light dark:[&.active]:text-white"
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        )}

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Page content */}
        <Outlet />

        {/* Devtools */}
        <TanStackRouterDevtools />
      </div>
    </ThemeProvider>
  );
};

export const Route = createRootRoute({ component: RootLayout });
