// Third-Party Packages
import clsx from "clsx";

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
    <div
      className={clsx(
        "px-4 py-3 bg-gray-200 rounded-t-xl flex flex-col gap-2 cursor-pointer hover:bg-gray-300 transition-colors",
        !isOpen && "rounded-b-xl"
      )}
      onClick={onToggle}
    >
      {/* Top row: day info, selected count, dropdown */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-lg font-semibold text-gray-800">{dayOfWeek}</p>
          <p className="text-md text-gray-600">{dayOfMonth}</p>
        </div>
        <div className="ml-2 px-2 py-1 text-xs font-medium text-gray-700 bg-gray-300 rounded-full">
          {selectedCount}/{totalSlots}
        </div>
        <ChevronDown
          className={clsx(
            "ml-2 transition-transform duration-200",
            isOpen ? "rotate-180" : ""
          )}
          size={20}
        />
      </div>

      {/* Bottom row: bulk checkboxes */}
      <CheckboxMenu {...checkboxMenuProps} />
    </div>
  );
}
