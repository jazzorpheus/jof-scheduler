// React
import { useState } from "react";

// Sample Data
import sampleEvent from "./data/sampleEvent.json";
import sampleTimeslots from "./data/sampleTimeslots24h.json";

// Group timeslots by day
const groupByDay = (timeslots) => {
  const days = {};
  timeslots.forEach((slot) => {
    const day = slot.datetime.split("T")[0];
    if (!days[day]) days[day] = [];
    days[day].push(slot);
  });
  return days;
};

// Modal component
function Modal({ slot, onClose }) {
  if (!slot) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 relative inline-block max-h-[90vh] overflow-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 font-bold text-xl"
        >
          ×
        </button>

        {/* Header with datetime, event, and Register button */}
        <div className="flex flex-wrap items-center justify-left mb-4 gap-2">
          <div>
            <h2 className="text-lg font-semibold">{slot.datetime}</h2>
            <p className="text-sm text-gray-600">Event: {slot.eventId}</p>
          </div>
          <button className="ml-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Register
          </button>
        </div>

        {/* Teams/users grid */}
        <div className="grid grid-cols-5 gap-4 w-full">
          {Object.entries(slot.registered).map(([teamId, users]) => {
            // Look up the team object in sampleEvent
            const teamObj = sampleEvent.teams.find((t) => t.id === teamId);
            const teamName = teamObj?.name || teamId; // fallback to ID if not found

            return (
              <div
                key={teamId}
                className="border rounded-lg p-2 bg-gray-50 flex flex-col"
              >
                <p className="font-medium text-sm mb-1">{teamName}</p>
                <ul className="list-disc list-inside text-xs flex-1 space-y-5">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <li key={i}>{users[i] || "---"}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function DayCard({ day, timeslots }) {
  const [open, setOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

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
            <button
              key={slot.timeslotId}
              onClick={() => setSelectedSlot(slot)}
              className="px-2 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium"
            >
              {slot.datetime.split("T")[1]}
            </button>
          ))}
        </div>
      )}

      {/* Modal for selected timeslot */}
      {selectedSlot && (
        <Modal slot={selectedSlot} onClose={() => setSelectedSlot(null)} />
      )}
    </div>
  );
}

export default function App() {
  const timeslotsByDay = groupByDay(sampleTimeslots);

  return (
    <div className="p-6 space-y-4">
      {Object.entries(timeslotsByDay).map(([day, slots]) => (
        <DayCard key={day} day={day} timeslots={slots} />
      ))}
    </div>
  );
}
