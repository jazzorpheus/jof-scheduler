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
      "text-slate-800 bg-gradient-to-b from-sky-200 to-sky-300 shadow-md hover:shadow-lg hover:from-sky-300 hover:to-sky-400 dark:text-sky-200 dark:bg-gradient-to-b dark:from-jof-blue-600 dark:to-jof-blue-900 dark:hover:shadow-xl dark:hover:from-jof-blue-500 dark:hover:to-jof-blue-800":
        confirm && !disabled,
      // Cancel button: rose colored
      "text-slate-800 bg-gradient-to-b from-rose-200 to-rose-300 shadow-md hover:shadow-lg hover:from-rose-300 hover:to-rose-400":
        cancel && !disabled,
      // Info button: small circular with icon
      "p-1 rounded-full": info && !disabled,
      // Close button: gray absolute top-right x
      "absolute top-0 right-3 text-gray-500 hover:text-gray-700 text-xl":
        close && !disabled,
      // Disabled state: gray, no hover/shadow, cursor-not-allowed
      "bg-gray-300 text-gray-500 shadow-none hover:shadow-none cursor-not-allowed":
        disabled,
    })
  );

  return (
    <button {...rest} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
