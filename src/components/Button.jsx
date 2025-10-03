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
      "text-slate-800 bg-gradient-to-b from-sky-200 to-sky-300 shadow-md hover:shadow-lg hover:from-sky-300 hover:to-sky-400 dark:text-white dark:bg-gradient-to-b dark:from-jof-blue-med dark:to-jof-blue-dark dark:hover:shadow-xl dark:hover:from-blue-950 dark:hover:to-jof-blue-med":
        confirm && !disabled,
      // Cancel button: rose colored
      "text-slate-800 bg-gradient-to-b from-rose-200 to-rose-300 shadow-md hover:shadow-lg hover:from-rose-300 hover:to-rose-400":
        cancel && !disabled,
      // Info button: small circular with icon
      "p-1 text-gray-500 hover:text-blue-500 rounded-full border border-gray-200 dark:hover:text-white":
        info && !disabled,
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
