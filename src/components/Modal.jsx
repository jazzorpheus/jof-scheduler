// React
import sampleEvent from "../data/sampleEvent.json";

// Icons
import { Check } from "lucide-react";

// Modal Component
export default function Modal({ slot, onClose, registeredSlots, onRegister }) {
  if (!slot) return null;

  const isRegistered = registeredSlots[slot.timeslotId]; // ✅ check registration

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 relative inline-block max-h-[90vh] overflow-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-2 text-gray-500 hover:text-gray-700 font-bold text-xl"
        >
          ×
        </button>

        {/* Header with datetime, event, and Register button */}
        <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
          <div>
            <h2 className="text-lg font-semibold">{slot.datetime}</h2>
            <p className="text-sm text-gray-600">Event: {slot.eventId}</p>
          </div>

          {isRegistered ? (
            <Check className="text-green-500" size={18} />
          ) : (
            <button
              onClick={() => {
                onRegister(slot.timeslotId);
                onClose();
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Register
            </button>
          )}
        </div>

        {/* Teams/users grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
          {Object.entries(slot.registered).map(([teamId, users]) => {
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
