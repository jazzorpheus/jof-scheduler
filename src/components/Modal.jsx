// React
import sampleEvent from "../data/sampleEvent.json";

// Local Components
import Button from "./Button";

// Modal Component
export default function Modal({ slot, onClose, selectedSlots, onSelectSlot }) {
  if (!slot) return null;

  const isSelected = selectedSlots[slot.timeslotId];

  // Format datetime
  const dateObj = new Date(slot.datetime);
  const formattedTime = dateObj.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // ensures 24-hour format like 01:00
  });
  const formattedDate = dateObj.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const formattedDateTime = `${formattedTime}  ${formattedDate}`;

  // Format event name
  const formattedEventName = slot.eventId
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 relative inline-block max-h-[90vh] overflow-auto">
        {/* Close Button */}
        <Button close onClick={onClose}>
          x
        </Button>

        {/* Header with datetime, event, and time window checkbox menu */}
        <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
          <div>
            <h2 className="text-lg font-semibold">{formattedDateTime}</h2>
            <p className="text-sm text-gray-600">Event: {formattedEventName}</p>
          </div>

          {isSelected ? (
            // Cancel slot
            <Button
              cancel
              onClick={() => {
                onSelectSlot(slot.timeslotId);
                onClose();
              }}
              className="mr-3"
            >
              Cancel selection
            </Button>
          ) : (
            // Select slot
            <Button
              confirm
              onClick={() => {
                onSelectSlot(slot.timeslotId);
                onClose();
              }}
              className="mr-3"
            >
              Select slot
            </Button>
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
