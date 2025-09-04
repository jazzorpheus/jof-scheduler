// React
import { useState } from "react";

// Local Components
import Modal from "./Modal";

// Icons
import { Info, Check, X } from "lucide-react";

export default function DayCard({
  day,
  timeslots,
  registeredSlots,
  onRegister,
}) {
  const [open, setOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

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

  // Compute checkbox states from current registeredSlots
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

  // Toggle slots in a window
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

  const handleSlotDeregister = (slot) => {
    if (registeredSlots[slot.timeslotId]) onRegister(slot.timeslotId);
  };

  const registeredCount = timeslots.filter(
    (slot) => registeredSlots[slot.timeslotId]
  ).length;

  return (
    <div
      className={`border rounded-xl shadow-sm transition-all ${
        open ? "col-span-full" : ""
      }`}
    >
      {/* Day header */}
      <div
        className="px-4 py-3 bg-gray-200 rounded-xl flex flex-col gap-2 cursor-pointer hover:bg-gray-300 transition-colors"
        onClick={() => setOpen(!open)}
      >
        {/* Expand/collapse text + registered count */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">{dayOfWeek}</p>
            <p className="text-md">{dayOfMonth}</p>
          </div>
          <div className="text-sm text-gray-600 whitespace-nowrap ml-2">
            {registeredCount}/{timeslots.length} registered
          </div>
        </div>

        {/* Bulk checkboxes */}
        <div className="flex flex-col items-center gap-2 mt-2">
          {/* Full Day */}
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

          {/* Part-day checkboxes */}
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

      {/* Timeslots grid */}
      {open && (
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-3">
          {timeslots.map((slot) => (
            <div
              key={slot.timeslotId}
              className="relative px-2 py-2 bg-gray-100 rounded-lg text-sm font-medium flex justify-between items-center"
            >
              <span>{slot.datetime.split("T")[1]}</span>

              <div className="flex items-center gap-1">
                {/* Info/details button */}
                <button
                  onClick={() => setSelectedSlot(slot)}
                  className="p-1 text-gray-600 hover:text-blue-500 hover:bg-white rounded-full border border-gray-300"
                  title="View details"
                >
                  <Info size={16} />
                </button>

                {/* Registered / Deregister */}
                {registeredSlots[slot.timeslotId] ? (
                  <div className="flex items-center gap-1">
                    <Check className="text-green-500" size={18} />
                    <button
                      onClick={() => handleSlotDeregister(slot)}
                      className="text-red-500 hover:text-red-700"
                      title="Deregister"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => onRegister(slot.timeslotId)}
                    className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition"
                  >
                    Register
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for selected timeslot */}
      {selectedSlot && (
        <Modal
          slot={selectedSlot}
          onClose={() => setSelectedSlot(null)}
          registeredSlots={registeredSlots}
          onRegister={onRegister}
        />
      )}
    </div>
  );
}
