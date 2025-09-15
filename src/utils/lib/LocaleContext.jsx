// React
import { createContext, useContext } from "react";

// Default values
const defaultLocale = "en-GB";
const defaultTimeZone = "UTC"; // Could use "Europe/London"

// Detect the user's locale from browser
const detectedLocale =
  typeof navigator !== "undefined" && navigator.language
    ? navigator.language
    : defaultLocale;

// Detect the user's time zone from browser
const detectedTimeZone =
  typeof Intl !== "undefined" && Intl.DateTimeFormat
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : defaultTimeZone;

// Create context for locale and time zone
export const LocaleContext = createContext({
  locale: detectedLocale,
  timeZone: detectedTimeZone,
});

// Provider component
export function LocaleProvider({ children }) {
  return (
    <LocaleContext.Provider
      value={{ locale: detectedLocale, timeZone: detectedTimeZone }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

// Custom hook to consume locale context
export const useLocale = () => useContext(LocaleContext);
