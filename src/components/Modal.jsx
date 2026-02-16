// React & React-DOM
import { useContext, useEffect } from "react";
import { createPortal } from "react-dom";

// Local Components
import Button from "./Button";
import TeamRostersGrid from "./TeamRostersGrid";

// Local Context
import { LocaleContext } from "../context/LocaleContext";
import { useSelectedEvent } from "../context/EventContext";

// Modal Component
export default function Modal({ slot, onClose, selectedSlots, onSelectSlot }) {
  const { locale, timeZone } = useContext(LocaleContext);
  const { selectedEvent } = useSelectedEvent();

  const teams = selectedEvent?.teams ?? [];

  // Resolve player IDs in slot.selected to actual player objects
  const slotWithPlayers = {};
  Object.entries(slot.selected).forEach(([teamId, playerIds]) => {
    const team = teams.find((t) => t.id === teamId);
    if (!team) return;
    // Map each player ID to the full player object
    slotWithPlayers[teamId] = playerIds
      .map((pid) => team.players.find((p) => p.id === pid))
      .filter(Boolean); // Remove any undefined if not found
  });

  // Make sure user can't scroll while modal is shown on-screen
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  if (!slot) return null;

  const isSelected = selectedSlots[slot.timeslotId];

  const dateObj = new Date(slot.datetimeUtc);
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

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 dark:bg-opacity-70"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="rounded-lg shadow-lg p-6 relative inline-block max-h-[90vh] overflow-auto
        bg-slate-300 border border-slate-500
        dark:bg-jof-blue-900 dark:border dark:border-jof-blue-500"
      >
        <div className="sticky top-0 flex justify-end z-10">
          <Button
            close
            onClick={onClose}
            className="-translate-y-7 translate-x-7"
          >
            x
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
          <div>
            <h2 className="text-lg font-semibold text-slate-800 dark:text-white">
              {formattedDateTime}
            </h2>
            <p className="text-sm text-slate-700 dark:text-gray-300">
              Event: {selectedEvent?.title ?? "Unknown Event"}
            </p>
          </div>

          {isSelected ? (
            <Button
              cancel
              className="px-4 py-2"
              onClick={() => {
                onSelectSlot(slot.timeslotId);
                onClose();
              }}
            >
              Cancel selection
            </Button>
          ) : (
            <Button
              confirm
              className="px-4 py-2"
              onClick={() => {
                onSelectSlot(slot.timeslotId);
                onClose();
              }}
            >
              Select slot
            </Button>
          )}
        </div>

        <TeamRostersGrid
          slotSelected={slotWithPlayers} // pass resolved player objects
          teams={teams}
          rosterSize={selectedEvent.playersPerTeam}
        />
      </div>
    </div>,
    document.querySelector(".modal-container"),
  );
}
