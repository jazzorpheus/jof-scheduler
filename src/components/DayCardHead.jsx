// Third-Party Packages
import clsx from "clsx";
import { motion } from "motion/react";

// Icons
import { ChevronDown } from "lucide-react";

// Local Components
import CheckboxMenu from "./CheckboxMenu";

// Top part of DayCard (not including expandable timeslots grid)
export default function DayCardHead({
  dayOfWeek,
  dayOfMonth,
  selectedCount,
  totalSlots,
  isOpen,
  onToggle,
  checkboxMenuProps,
}) {
  return (
    <motion.div
      layout="position"
      className={clsx(
        "px-4 py-3 rounded-t-xl flex flex-col gap-2 cursor-pointer transition-colors text-slate-700 bg-gradient-to-b from-slate-300 to-slate-300/20 hover:bg-gradient-to-b hover:from-slate-200/80 hover:to-slate-200/30 dark:text-white dark:bg-gradient-to-b dark:from-jof-blue-700 dark:to-jof-blue-900 dark:hover:bg-gradient-to-b dark:hover:from-jof-blue-600 dark:hover:to-jof-blue-800",
        !isOpen && "rounded-b-xl",
      )}
      onClick={onToggle}
    >
      {/* Top row: day info, selected count, dropdown */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold text-slate-700 dark:text-white">
            {dayOfWeek}
          </p>
          <p className="text-md text-slate-600 dark:text-white">{dayOfMonth}</p>
        </div>
        <div className="ml-2 px-2 py-1 text-xs font-medium rounded-full text-slate-700 dark:text-white bg-transparent">
          {selectedCount}/{totalSlots}
        </div>
        <ChevronDown
          className={clsx(
            "ml-2 transition-transform duration-200",
            isOpen ? "rotate-180" : "",
          )}
          size={20}
        />
      </div>

      {/* Bottom row: bulk checkboxes */}
      <CheckboxMenu {...checkboxMenuProps} />
    </motion.div>
  );
}
