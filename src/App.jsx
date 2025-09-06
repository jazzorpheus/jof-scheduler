// React
import { useState } from "react";

// Sample Data
import sampleTimeslots from "./data/sampleTimeslots24h.json";

// Local Components
import AvailabilityPage from "./pages/AvailabilityPage";

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
  const [registeredSlots, setRegisteredSlots] = useState({});

  const handleRegister = (slotId) => {
    setRegisteredSlots((prev) => ({
      ...prev,
      [slotId]: !prev[slotId],
    }));
  };

  return (
    <AvailabilityPage
      days={days}
      registeredSlots={registeredSlots}
      handleRegister={handleRegister}
    />
  );
}
