// Third-Party Packages
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// Generic, reusable button component
export default function Button({
  children,
  confirm,
  cancel,
  info,
  close,
  disabled,
  ...rest
}) {
  const baseClasses = "font-bold rounded-lg"; // always applied
  const classes = twMerge(
    clsx(rest.className, baseClasses, {
      // Confirm button: sky colored
      "dark:text-sky-200 dark:bg-gradient-to-b dark:from-jof-blue-600 dark:to-jof-blue-900 dark:shadow-md dark:hover:shadow-xl dark:hover:from-jof-blue-500 dark:hover:to-jof-blue-800 dark:border-2 dark:border-transparent dark:hover:text-white dark:hover:border-jof-blue-light bg-clip-padding":
        confirm && !disabled,
      // Cancel button: rose colored
      "dark:text-jof-blue-900 dark:bg-gradient-to-b dark:from-rose-400 dark:to-rose-500 dark:shadow-md dark:hover:shadow-lg dark:border-2 dark:border-transparent dark:hover:border-rose-300 bg-clip-padding":
        cancel && !disabled,
      // Info button: small circular with icon
      "p-1 rounded-full": info && !disabled,
      // Close button: gray absolute top-right x
      "absolute top-0 right-3 dark:text-gray-500 dark:hover:text-gray-400 text-xl":
        close && !disabled,
      // Disabled state: gray, no hover/shadow, cursor-not-allowed
      "dark:bg-gray-300 dark:text-gray-500 dark:shadow-none dark:hover:shadow-none cursor-not-allowed":
        disabled,
    })
  );

  return (
    <button {...rest} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
