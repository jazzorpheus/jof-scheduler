// React
import { useState } from "react";

// Sample Data
import sampleTimeslots from "./data/sampleTimeslots24h.json";

// Local Components
import DayCard from "./components/DayCard";

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

export default function App() {
  const timeslotsByDay = groupByDay(sampleTimeslots);
  const [expandedDay, setExpandedDay] = useState(null);
  const [registeredSlots, setRegisteredSlots] = useState({});

  const handleRegister = (slotId) => {
    setRegisteredSlots((prev) => ({
      ...prev,
      [slotId]: !prev[slotId], // toggle registration
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(timeslotsByDay).map(([day, slots]) => (
          <DayCard
            key={day}
            day={day}
            timeslots={slots}
            isExpanded={expandedDay === day}
            onToggle={() => setExpandedDay(expandedDay === day ? null : day)}
            registeredSlots={registeredSlots}
            onRegister={handleRegister} // pass handler to DayCard
          />
        ))}
      </div>
    </div>
  );
}
