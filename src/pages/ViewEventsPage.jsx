import { useEffect, useState } from "react";

export default function ViewEventsPage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then(setEvents);
  }, []);

  return (
    <div className="h-screen text-slate-900 dark:text-white text-center">
      <h1>Events</h1>
      <ul>
        {events.map((evt) => (
          <li key={evt.id}>
            {evt.name} – {evt.startDate}
          </li>
        ))}
      </ul>
    </div>
  );
}
