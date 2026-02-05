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
      "bg-clip-padding border-2 border-transparent text-slate-700 bg-gradient-to-b from-slate-200 to-slate-400 hover:shadow-md hover:text-slate-800 hover:from-white hover:to-slate-400 hover:border-slate-300 dark:text-sky-200 dark:bg-gradient-to-b dark:from-jof-blue-600 dark:to-jof-blue-900 dark:hover:shadow-md dark:hover:from-jof-blue-500 dark:hover:to-jof-blue-800 dark:border-2 dark:border-transparent dark:hover:text-white dark:hover:border-jof-blue-light":
        confirm && !disabled,
      // Cancel button
      "bg-clip-padding border-2 border-transparent text-slate-800 bg-gradient-to-b from-rose-300/60 to-rose-400/60 hover:shadow-md hover:border-rose-200 dark:text-jof-blue-900 dark:bg-gradient-to-b dark:from-rose-400 dark:to-rose-500 dark:hover:shadow-md dark:border-2 dark:border-transparent dark:hover:border-rose-300":
        cancel && !disabled,
      // Info button
      "p-1 rounded-full": info && !disabled,
      // Close button
      "absolute top-0 right-3 text-xl text-slate-700 hover:text-slate-900 dark:text-gray-500 dark:hover:text-gray-400":
        close && !disabled,
      // Disabled state
      "dark:bg-gray-300 dark:text-gray-500 dark:shadow-none dark:hover:shadow-none cursor-not-allowed":
        disabled,
    }),
  );

  return (
    <button {...rest} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}
