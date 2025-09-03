// React
import { useState } from "react";

// Local Components
import Modal from "./Modal";

// Icons
import { Info, Check } from "lucide-react";

// DayCard Component
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
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-3 bg-gray-200 hover:bg-gray-300 rounded-xl flex justify-between items-center"
      >
        <div>
          <p className="text-lg font-semibold">{dayOfWeek}</p>
          <p className="text-md text-left">{dayOfMonth}</p>
        </div>
        <div className="text-sm text-gray-600">
          {registeredCount}/{timeslots.length} registered
        </div>
      </button>

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

                {/* Register / Tick */}
                {registeredSlots[slot.timeslotId] ? (
                  <Check className="text-green-500" size={18} />
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
