import { Link } from "@tanstack/react-router";
import { CalendarPlus, CalendarSearch } from "lucide-react";
import PageFooter from "../components/PageFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 gap-8 sm:flex-row sm:gap-12 max-w-5xl mx-auto w-full">
        
        {/* Create Event Card */}
        <Link
          to="/create"
          className="group flex flex-col items-center justify-center gap-4 w-full sm:w-1/2 aspect-square sm:aspect-auto sm:h-80 bg-white dark:bg-jof-blue-800 rounded-3xl shadow-xl border-2 border-transparent hover:border-jof-blue-light hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-8 cursor-pointer"
        >
          <div className="p-6 rounded-full bg-blue-50 dark:bg-jof-blue-900 group-hover:bg-jof-blue-600 dark:group-hover:bg-jof-blue-700 transition-colors">
            <CalendarPlus size={64} className="text-jof-blue-600 dark:text-jof-blue-light transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] dark:group-hover:drop-shadow-[0_0_15px_rgba(120,190,255,0.8)]" />
          </div>
          <span className="text-2xl font-bold text-gray-800 dark:text-jof-blue-light text-center group-hover:text-jof-blue-600 dark:group-hover:text-white transition-colors">
            Create New Event
          </span>
        </Link>

        {/* View Events Card */}
        <Link
          to="/view"
          className="group flex flex-col items-center justify-center gap-4 w-full sm:w-1/2 aspect-square sm:aspect-auto sm:h-80 bg-white dark:bg-jof-blue-800 rounded-3xl shadow-xl border-2 border-transparent hover:border-jof-blue-light hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-8 cursor-pointer"
        >
          <div className="p-6 rounded-full bg-blue-50 dark:bg-jof-blue-900 group-hover:bg-jof-blue-600 dark:group-hover:bg-jof-blue-700 transition-colors">
            <CalendarSearch size={64} className="text-jof-blue-600 dark:text-jof-blue-light transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] dark:group-hover:drop-shadow-[0_0_15px_rgba(120,190,255,0.8)]" />
          </div>
          <span className="text-2xl font-bold text-gray-800 dark:text-jof-blue-light text-center group-hover:text-jof-blue-600 dark:group-hover:text-white transition-colors">
            View Your Events
          </span>
        </Link>

      </main>

      {/* FOOTER */}
      <PageFooter />
    </div>
  );
}
