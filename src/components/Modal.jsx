// React
import sampleEvent from "../data/sampleEvent.json";

// Icons
import { Check, X } from "lucide-react";

// Modal Component
export default function Modal({ slot, onClose, selectedSlots, onSelectSlot }) {
  if (!slot) return null;

  const isSelected = selectedSlots[slot.timeslotId];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 relative inline-block max-h-[90vh] overflow-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-3 text-gray-500 hover:text-gray-700 font-bold text-xl"
        >
          ×
        </button>

        {/* Header with datetime, event, and time window checkbox menu */}
        <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
          <div>
            <h2 className="text-lg font-semibold">{slot.datetime}</h2>
            <p className="text-sm text-gray-600">Event: {slot.eventId}</p>
          </div>

          {isSelected ? (
            <button
              onClick={() => {
                onSelectSlot(slot.timeslotId);
                onClose();
              }}
              className="mr-4 px-4 py-2 rounded-lg font-bold text-slate-800
               bg-gradient-to-b from-rose-300 to-rose-400
               shadow-md hover:shadow-lg
               hover:from-rose-200 hover:to-rose-300
               transition"
            >
              Cancel selection
            </button>
          ) : (
            <button
              onClick={() => {
                onSelectSlot(slot.timeslotId);
                onClose();
              }}
              className="mr-4 px-4 py-2 rounded-lg font-bold text-slate-800
               bg-gradient-to-b from-sky-300 to-sky-400
               shadow-md hover:shadow-lg
               hover:from-sky-200 hover:to-sky-300
               transition"
            >
              Select slot
            </button>
          )}
        </div>

        {/* Teams/users grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
          {Object.entries(slot.selected).map(([teamId, users]) => {
            const teamObj = sampleEvent.teams.find((t) => t.id === teamId);
            const teamName = teamObj?.name || teamId;

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
