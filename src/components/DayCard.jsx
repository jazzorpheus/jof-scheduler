// React
import { useState } from "react";

// Local Components
import Modal from "./Modal";

// Icons
import { Info, Check } from "lucide-react";

// DayCard Component
export default function DayCard({ day, timeslots }) {
  const [open, setOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [registeredSlots, setRegisteredSlots] = useState({});

  // Toggle registration for a slot
  const handleRegister = (slotId) => {
    setRegisteredSlots((prev) => ({
      ...prev,
      [slotId]: true,
    }));
  };

  return (
    <div className="border rounded-xl shadow-sm">
      {/* Day header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl flex justify-between items-center"
      >
        <span className="font-semibold">{day}</span>
        <span className="text-gray-500">{open ? "▲" : "▼"}</span>
      </button>

      {/* Timeslots grid */}
      {open && (
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {timeslots.map((slot) => (
            <div
              key={slot.timeslotId}
              className="relative px-2 py-2 bg-gray-100 rounded-lg text-sm font-medium flex justify-between items-center"
            >
              {/* Timeslot time */}
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

                {/* Register button OR check icon */}
                {registeredSlots[slot.timeslotId] ? (
                  <Check className="text-green-500" size={18} />
                ) : (
                  <button
                    onClick={() => handleRegister(slot.timeslotId)}
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
          onRegister={(slotId) => {
            handleRegister(slotId);
            setSelectedSlot(null); // close modal after registering
          }}
          isRegistered={registeredSlots[selectedSlot.timeslotId]}
        />
      )}
    </div>
  );
}
