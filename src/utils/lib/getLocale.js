// Returns the current locale in a safe way for browser or server
export function getLocale(defaultLocale = "en-GB") {
  if (typeof navigator !== "undefined" && navigator.language) {
    return navigator.language;
  }
  return defaultLocale;
}
