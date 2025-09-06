// React
import { useState } from "react";

// Third-Party Libraries
import { motion, AnimatePresence } from "motion/react";

// Local Components
import Modal from "./Modal";

// Icons
import { ChevronDown, Info } from "lucide-react";

export default function DayCard({
  day,
  timeslots,
  registeredSlots,
  onRegister,
}) {
  const [open, _setOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [highlightedSlot, setHighlightedSlot] = useState(null);
  const [highlightType, setHighlightType] = useState(null); // "register" | "deregister"

  // Format day
  const dateObj = new Date(day);
  const dayOfWeek = dateObj.toLocaleDateString(undefined, { weekday: "long" });
  const dayOfMonth = dateObj.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
  });

  // --- Helpers ---
  const getHour = (slot) => new Date(slot.datetime).getHours();

  const windows = {
    morning: timeslots.filter((s) => getHour(s) >= 6 && getHour(s) <= 11),
    afternoon: timeslots.filter((s) => getHour(s) >= 12 && getHour(s) <= 17),
    evening: timeslots.filter((s) => getHour(s) >= 18 && getHour(s) <= 23),
    fullday: timeslots,
  };

  const morningChecked = windows.morning.every(
    (s) => registeredSlots[s.timeslotId]
  );
  const afternoonChecked = windows.afternoon.every(
    (s) => registeredSlots[s.timeslotId]
  );
  const eveningChecked = windows.evening.every(
    (s) => registeredSlots[s.timeslotId]
  );
  const fullDayChecked = windows.fullday.every(
    (s) => registeredSlots[s.timeslotId]
  );

  const toggleWindow = (window, checked) => {
    windows[window].forEach((slot) => {
      const isRegistered = registeredSlots[slot.timeslotId];
      if (checked && !isRegistered) onRegister(slot.timeslotId);
      if (!checked && isRegistered) onRegister(slot.timeslotId);
    });
  };

  const handleFullDayChange = (e) => toggleWindow("fullday", e.target.checked);
  const handlePartDayChange = (window, e) =>
    toggleWindow(window, e.target.checked);

  const handleRegister = (slotId) => {
    const isCurrentlyRegistered = registeredSlots[slotId];
    onRegister(slotId); // toggles registration

    setHighlightedSlot(slotId);
    setHighlightType(isCurrentlyRegistered ? "deregister" : "register");

    setTimeout(() => {
      setHighlightedSlot(null);
      setHighlightType(null);
    }, 500);
  };

  const registeredCount = timeslots.filter(
    (slot) => registeredSlots[slot.timeslotId]
  ).length;

  return (
    <motion.div
      layout
      transition={{
        layout: { type: "tween", duration: 0.25, ease: "easeInOut" },
      }}
      className={`border rounded-xl shadow-sm ${open ? "col-span-full" : ""}`}
    >
      {/* Day header */}
      <div
        className="px-4 py-3 bg-gray-200 rounded-xl flex flex-col gap-2 cursor-pointer hover:bg-gray-300 transition-colors"
        onClick={() => _setOpen(!open)}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">{dayOfWeek}</p>
            <p className="text-md">{dayOfMonth}</p>
          </div>
          <div className="text-sm text-gray-600 whitespace-nowrap ml-2">
            {registeredCount}/{timeslots.length} registered
          </div>
          <ChevronDown
            className={`ml-2 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
            size={20}
          />
        </div>

        {/* Bulk checkboxes */}
        <div className="flex flex-col items-center gap-2 mt-2">
          <label
            className="flex items-center gap-2 px-4 py-2 text-lg font-medium bg-gray-200 rounded-lg hover:bg-gray-400"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="checkbox"
              checked={fullDayChecked}
              onChange={handleFullDayChange}
              className="w-5 h-5"
            />
            Full Day
          </label>

          <div className="flex gap-4 mt-1">
            {["morning", "afternoon", "evening"].map((w) => (
              <label
                key={w}
                className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200"
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
                  className="w-4 h-4"
                />
                {w.charAt(0).toUpperCase() + w.slice(1)}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Timeslots grid sliding down */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "tween", duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden w-full mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-3"
          >
            {timeslots.map((slot) => {
              const isRegistered = registeredSlots[slot.timeslotId];
              return (
                <motion.div
                  key={slot.timeslotId}
                  layout
                  transition={{
                    layout: {
                      type: "tween",
                      duration: 0.25,
                      ease: "easeInOut",
                    },
                  }}
                  onClick={() => handleRegister(slot.timeslotId)}
                  className={`relative px-2 py-2 rounded-lg text-sm font-medium flex justify-between items-center cursor-pointer transition-colors
                    ${
                      isRegistered
                        ? "bg-green-200 hover:bg-green-300"
                        : "bg-gray-100 hover:bg-gray-200"
                    }
                    ${
                      highlightedSlot === slot.timeslotId
                        ? highlightType === "register"
                          ? "animate-slotHighlight-green"
                          : "animate-slotHighlight-red"
                        : ""
                    }`}
                >
                  <span>{slot.datetime.split("T")[1].slice(0, 5)}</span>

                  {isRegistered && (
                    <span className="ml-2 text-green-700 text-xs font-semibold">
                      Registered
                    </span>
                  )}

                  <div
                    className="flex items-center gap-1 ml-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => setSelectedSlot(slot)}
                      className="p-1 text-gray-600 hover:text-blue-500 rounded-full border border-gray-300"
                      title="View details"
                    >
                      <Info size={16} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal for selected timeslot */}
      {selectedSlot && (
        <Modal
          slot={selectedSlot}
          onClose={() => setSelectedSlot(null)}
          registeredSlots={registeredSlots}
          onRegister={handleRegister}
        />
      )}
    </motion.div>
  );
}
