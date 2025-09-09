// React
import { useState } from "react";

// Third-Party Libraries
import clsx from "clsx";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

// Icons
import { ChevronDown, Info } from "lucide-react";

// Local Components
import Modal from "./Modal";
import TimeslotCell from "./TimeslotCell";

export default function DayCard({
  day,
  timeslots,
  selectedSlots,
  onSelectSlot,
  isOpen,
  onToggle,
}) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [highlightedSlot, setHighlightedSlot] = useState(null);
  const [highlightType, setHighlightType] = useState(null);

  const dateObj = new Date(day.date + "T00:00:00");
  const dayOfWeek =
    day.dayOfWeek || dateObj.toLocaleDateString(undefined, { weekday: "long" });
  const dayOfMonth =
    day.dayOfMonth ||
    dateObj.toLocaleDateString(undefined, { day: "numeric", month: "short" });

  const getHour = (slot) => new Date(slot.datetime).getHours();

  const windows = {
    morning: timeslots.filter((s) => getHour(s) >= 6 && getHour(s) <= 11),
    afternoon: timeslots.filter((s) => getHour(s) >= 12 && getHour(s) <= 17),
    evening: timeslots.filter((s) => getHour(s) >= 18 && getHour(s) <= 23),
    fullday: timeslots,
  };

  const morningChecked = windows.morning.every(
    (s) => selectedSlots[s.timeslotId]
  );
  const afternoonChecked = windows.afternoon.every(
    (s) => selectedSlots[s.timeslotId]
  );
  const eveningChecked = windows.evening.every(
    (s) => selectedSlots[s.timeslotId]
  );
  const fullDayChecked = windows.fullday.every(
    (s) => selectedSlots[s.timeslotId]
  );

  const toggleWindow = (window, checked) => {
    windows[window].forEach((slot) => {
      const isSelected = selectedSlots[slot.timeslotId];
      if (checked && !isSelected) onSelectSlot(slot.timeslotId);
      if (!checked && isSelected) onSelectSlot(slot.timeslotId);
    });
  };

  const handleFullDayChange = (e) => toggleWindow("fullday", e.target.checked);
  const handlePartDayChange = (window, e) =>
    toggleWindow(window, e.target.checked);

  const handleSelectSlot = (slotId) => {
    const isCurrentlySelected = selectedSlots[slotId];
    onSelectSlot(slotId);

    setHighlightedSlot(slotId);
    setHighlightType(isCurrentlySelected ? "deselect" : "select");

    setTimeout(() => {
      setHighlightedSlot(null);
      setHighlightType(null);
    }, 500);
  };

  const selectedCount = timeslots.filter(
    (slot) => selectedSlots[slot.timeslotId]
  ).length;

  return (
    <motion.div
      layout={window.innerWidth >= 640}
      transition={{
        layout: { type: "tween", duration: 0.25, ease: "easeOut" },
      }}
      className={clsx(
        "border rounded-xl shadow-sm bg-gray-50",
        isOpen ? "col-span-full" : ""
      )}
    >
      {/* Day header */}
      <div
        className="px-4 py-3 bg-gray-200 rounded-t-xl flex flex-col gap-2 cursor-pointer hover:bg-gray-300 transition-colors"
        onClick={onToggle}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold text-gray-800">{dayOfWeek}</p>
            <p className="text-md text-gray-600">{dayOfMonth}</p>
          </div>
          <div className="ml-2 px-2 py-1 text-xs font-medium text-gray-700 bg-gray-300 rounded-full">
            {selectedCount}/{timeslots.length}
          </div>
          <ChevronDown
            className={clsx(
              "ml-2 transition-transform duration-200",
              isOpen ? "rotate-180" : ""
            )}
            size={20}
          />
        </div>

        {/* Bulk checkboxes */}
        <div className="flex flex-col items-center gap-2 mt-2">
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

          <div className="flex flex-col sm:flex-row sm:flex-nowrap justify-center gap-2 mt-1">
            {["morning", "afternoon", "evening"].map((w) => (
              <label
                key={w}
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
                    }[w]
                  }
                  onChange={(e) => handlePartDayChange(w, e)}
                  className="w-3 h-3"
                />
                {w.charAt(0).toUpperCase() + w.slice(1)}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Timeslots grid */}
      {isOpen && (
        <div className="overflow-hidden w-full mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-3">
          {timeslots.map((slot) => {
            return (
              <TimeslotCell
                key={slot.timeslotId}
                slot={slot}
                isSelected={selectedSlots[slot.timeslotId] === true}
                highlightedSlot={highlightedSlot}
                highlightType={highlightType}
                onSelect={handleSelectSlot}
                onInfoClick={setSelectedSlot} // or your modal open handler
              />
            );
          })}
        </div>
      )}

      {/* Modal for selected timeslot */}
      {selectedSlot && (
        <Modal
          slot={selectedSlot}
          onClose={() => setSelectedSlot(null)}
          selectedSlots={selectedSlots}
          onSelectSlot={handleSelectSlot}
        />
      )}
    </motion.div>
  );
}
