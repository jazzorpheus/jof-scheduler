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
      // Confirm button
      "text-slate-700 bg-gradient-to-b from-slate-100 to-slate-400 dark:text-sky-200 dark:bg-gradient-to-b dark:from-jof-blue-600 dark:to-jof-blue-900 hover:shadow-md dark:hover:shadow-md hover:from-white hover:to-slate-400 dark:hover:from-jof-blue-500 dark:hover:to-jof-blue-800 border-2 dark:border-2 border-transparent dark:border-transparent hover:text-slate-800 dark:hover:text-white hover:border-white dark:hover:border-jof-blue-light bg-clip-padding":
        confirm && !disabled,
      // Cancel button
      "text-slate-800 bg-gradient-to-b from-rose-300 to-rose-400 dark:text-jof-blue-900 dark:bg-gradient-to-b dark:from-rose-400 dark:to-rose-500 hover:shadow-md dark:hover:shadow-md border-2 dark:border-2 border-transparent dark:border-transparent hover:border-rose-200 dark:hover:border-rose-300 bg-clip-padding":
        cancel && !disabled,
      // Info button
      "p-1 rounded-full": info && !disabled,
      // Close button
      "absolute top-0 right-3 dark:text-gray-500 dark:hover:text-gray-400 text-xl":
        close && !disabled,
      // Disabled state
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
