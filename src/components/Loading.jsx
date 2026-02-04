import { CalendarClock } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full animate-pulse gap-6 text-gray-700 dark:text-jof-blue-light">
      <CalendarClock size={64} />
      <span className="text-2xl font-semibold tracking-wide uppercase">
        Loading...
      </span>
    </div>
  );
}
