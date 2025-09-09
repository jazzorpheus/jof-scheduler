// Third-Party Packages
import className from "classnames";
import { twMerge } from "tailwind-merge";

export default function Button({
  children,
  confirm,
  cancel,
  info,
  close,
  ...rest
}) {
  const classes = twMerge(
    className(
      rest.className,
      // Base styles for all buttons
      "font-bold",
      {
        // Confirm button: sky colored
        "px-4 py-2 rounded-lg text-slate-800 bg-gradient-to-b from-sky-200 to-sky-300 shadow-md hover:shadow-lg hover:from-sky-300 hover:to-sky-400":
          confirm,
        // Cancel button: rose colored
        "px-4 py-2 rounded-lg text-slate-800 bg-gradient-to-b from-rose-200 to-rose-300 shadow-md hover:shadow-lg hover:from-rose-300 hover:to-rose-400":
          cancel,
        // Info button: small circular with icon
        "p-1 text-gray-500 hover:text-blue-500 rounded-full border border-gray-200":
          info,
        // Close button: absolute top-right ×
        "absolute top-0 right-3 text-gray-500 hover:text-gray-700 text-xl":
          close,
      }
    )
  );

  return (
    <div>
      <button {...rest} className={classes}>
        {children}
      </button>
    </div>
  );
}
