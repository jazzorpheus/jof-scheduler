// React & React-DOM
import { useContext, useEffect } from "react";
import { createPortal } from "react-dom";

// Local Data
import sampleEvent from "../data/sampleEvent.json";

// Local Components
import Button from "./Button";
import TeamRostersGrid from "./TeamRostersGrid";

// Local Context
import { LocaleContext } from "../utils/lib/LocaleContext";

// Modal Component
export default function Modal({ slot, onClose, selectedSlots, onSelectSlot }) {
  const { locale, timeZone } = useContext(LocaleContext);

  // Make sure user can't scroll while modal is shown on-screen
  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    // CleanUp function
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  if (!slot) return null;

  const isSelected = selectedSlots[slot.timeslotId];

  const dateObj = new Date(slot.datetime);
  const formattedTime = dateObj.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  });
  const formattedDate = dateObj.toLocaleDateString(locale, {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone,
  });
  const formattedDateTime = `${formattedTime}  ${formattedDate}`;

  const formattedEventName = slot.eventId
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  // Create a portal to send this component/element to the <div class="model-container"> in index.html
  // so that the absolute/fixed position property allows the div with inset-0 to take up entire html body.
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 relative inline-block max-h-[90vh] overflow-auto">
        <Button close onClick={onClose}>
          x
        </Button>

        <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
          <div>
            <h2 className="text-lg font-semibold">{formattedDateTime}</h2>
            <p className="text-sm text-gray-600">Event: {formattedEventName}</p>
          </div>

          {isSelected ? (
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

        <TeamRostersGrid
          slotSelected={slot.selected}
          teams={sampleEvent.teams}
          rosterSize={sampleEvent.settings.maxPlayersPerTeam}
        />
      </div>
    </div>,
    // 2nd argument is used to select the element to 'portal' the above into!
    document.querySelector(".modal-container")
  );
}
