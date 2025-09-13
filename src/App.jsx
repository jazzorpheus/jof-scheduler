// React
import { useState } from "react";

// Sample Data
import sampleTimeslots from "./data/sampleTimeslots24h.json";

// Local Pages
import SelectAvailabilityPage from "./pages/SelectAvailabilityPage";

// Group timeslots by day and add formatted strings
const groupByDay = (timeslots) => {
  const days = {};
  timeslots.forEach((slot) => {
    const day = slot.datetime.split("T")[0];
    if (!days[day]) days[day] = [];
    days[day].push(slot);
  });

  return Object.entries(days).map(([date, timeslots]) => {
    const d = new Date(date);
    const dayOfWeek = d.toLocaleDateString("en-US", { weekday: "long" });
    const dayOfMonth = d.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
    });
    return { date, timeslots, dayOfWeek, dayOfMonth };
  });
};

export default function App() {
  const days = groupByDay(sampleTimeslots);
  const [selectedSlots, setSelectedSlots] = useState({});

  const handleSelectSlots = (slotId) => {
    setSelectedSlots((prev) => ({
      ...prev,
      [slotId]: !prev[slotId],
    }));
  };

  return (
    <SelectAvailabilityPage
      days={days}
      selectedSlots={selectedSlots}
      handleSelectSlots={handleSelectSlots}
    />
  );
}
