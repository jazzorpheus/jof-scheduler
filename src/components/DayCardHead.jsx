// Third-Party Packages
import clsx from "clsx";

// Icons
import { ChevronDown } from "lucide-react";

export default function DayCardHead({
  dayOfWeek,
  dayOfMonth,
  selectedCount,
  totalSlots,
  isOpen,
  onToggle,
  handleFullDayChange,
  handlePartDayChange,
  morningChecked,
  afternoonChecked,
  eveningChecked,
  fullDayChecked,
}) {
  return (
    <div
      className="px-4 py-3 bg-gray-200 rounded-t-xl flex flex-col gap-2 cursor-pointer hover:bg-gray-300 transition-colors"
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
      <div className="flex flex-col items-center gap-2 mt-2">
        {/* Full Day */}
        <label
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            checked={fullDayChecked}
            onChange={handleFullDayChange}
            className="w-4 h-4"
          />
          Full Day
        </label>

        {/* Morning / Afternoon / Evening */}
        <div className="flex flex-col sm:flex-row sm:flex-nowrap justify-center gap-2 mt-1">
          {["morning", "afternoon", "evening"].map((period) => (
            <label
              key={period}
              className="flex items-center gap-1 px-3 py-1 text-xs bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                checked={
                  {
                    morning: morningChecked,
                    afternoon: afternoonChecked,
                    evening: eveningChecked,
                  }[period]
                }
                onChange={(e) => handlePartDayChange(period, e)}
                className="w-3 h-3"
              />
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
