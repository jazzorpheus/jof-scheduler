import { Link } from "@tanstack/react-router";
import { CalendarPlus, CalendarSearch } from "lucide-react";
import PageFooter from "../components/PageFooter";

export default function HomePage() {
  return (
    <div className="h-screen overflow-hidden flex flex-col bg-slate-400 dark:bg-jof-blue-900">
      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 md:px-12 gap-6 sm:flex-row sm:gap-12 max-w-5xl mx-auto w-full min-h-0">
        
        {/* Create Event Card */}
        <Link
          to="/create"
          className="group flex flex-col items-center justify-center gap-4 w-full flex-1 sm:flex-none sm:w-1/2 sm:h-80 bg-slate-300 dark:bg-jof-blue-800 rounded-3xl shadow-xl border-2 border-transparent hover:border-sky-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-4 sm:p-8 cursor-pointer min-h-0"
        >
          <div className="p-4 sm:p-6 rounded-full bg-slate-300 dark:bg-jof-blue-900 group-hover:bg-sky-200 dark:group-hover:bg-jof-blue-700 transition-colors">
            <CalendarPlus size={48} className="sm:w-16 sm:h-16 text-jof-blue-600 dark:text-jof-blue-light transition-all duration-300 dark:group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] dark:group-hover:drop-shadow-[0_0_15px_rgba(120,190,255,0.8)]" />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-jof-blue-light text-center group-hover:text-jof-blue-400 dark:group-hover:text-white transition-colors">
            Create New Event
          </span>
        </Link>

        {/* View Events Card */}
        <Link
          to="/view"
          className="group flex flex-col items-center justify-center gap-4 w-full flex-1 sm:flex-none sm:w-1/2 sm:h-80 bg-slate-300 dark:bg-jof-blue-800 rounded-3xl shadow-xl border-2 border-transparent hover:border-sky-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-4 sm:p-8 cursor-pointer min-h-0"
        >
          <div className="p-4 sm:p-6 rounded-full bg-slate-300 dark:bg-jof-blue-900 group-hover:bg-sky-200 dark:group-hover:bg-jof-blue-700 transition-colors">
            <CalendarSearch size={48} className="sm:w-16 sm:h-16 text-jof-blue-600 dark:text-jof-blue-light transition-all duration-300 dark:group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(59,130,246,0.6)] dark:group-hover:drop-shadow-[0_0_15px_rgba(120,190,255,0.8)]" />
          </div>
          <span className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-jof-blue-light text-center group-hover:text-jof-blue-400 dark:group-hover:text-white transition-colors">
            View Your Events
          </span>
        </Link>

      </main>

      {/* FOOTER */}
      <PageFooter/>
    </div>
  );
}
