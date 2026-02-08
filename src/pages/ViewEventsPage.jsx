import { useEffect, useState } from "react";
import { useSelectedEvent } from "../context/EventContext";

export default function ViewEventsPage() {
  const [events, setEvents] = useState([]);
  const { selectedEvent, selectEvent } = useSelectedEvent();

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then(setEvents);
  }, []);

  return (
    <div className="h-screen text-slate-900 dark:text-white text-center">
      <h1>Events</h1>

      <ul className="flex flex-col gap-2">
        {events.map((evt) => {
          const isSelected = selectedEvent?.id === evt.id;

          return (
            <li key={evt.id}>
              <button
                onClick={() => selectEvent(evt)}
                className={`
                  px-4 py-2 rounded-md
                  ${
                    isSelected
                      ? "bg-blue-500 text-white"
                      : "bg-slate-200 dark:bg-jof-blue-800"
                  }
                `}
              >
                {evt.title} – {evt.startDate}
              </button>
            </li>
          );
        })}
      </ul>

      {selectedEvent && (
        <p className="mt-4 text-sm opacity-80">
          Selected event: {selectedEvent.title}
        </p>
      )}
    </div>
  );
}
