// React
import { useState } from "react";

// Sample Data
import sampleTimeslots from "../data/sampleTimeslots24h.json";

// Local Components
import DayCard from "../components/DayCard";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";

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
const days = groupByDay(sampleTimeslots);

// Page for selecting available timeslots
export default function SelectAvailabilityPage() {
  const [openStates, setOpenStates] = useState(
    days.reduce((acc, day) => {
      acc[day.date] = false;
      return acc;
    }, {})
  );

  const [selectedSlots, setSelectedSlots] = useState({});

  const toggleSingle = (date) => {
    setOpenStates((prev) => ({ ...prev, [date]: !prev[date] }));
  };

  const handleSelectSlots = (slotId) => {
    setSelectedSlots((prev) => ({
      ...prev,
      [slotId]: !prev[slotId],
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <PageHeader title="Select Your Availability">
        {/* Please select your availability from the timeslots below.  */}
        You don't have to be 100% certain you can make it to all the slots you
        select — we just want an idea of times people tend to be available.
      </PageHeader>

      {/* MAIN CONTENT */}
      <main className="mx-auto max-w-5xl flex-1 px-4 pt-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {days.map((day) => (
            <DayCard
              key={day.date}
              day={day}
              timeslots={day.timeslots}
              selectedSlots={selectedSlots}
              onSelectSlot={handleSelectSlots}
              isOpen={openStates[day.date]}
              onToggle={() => toggleSingle(day.date)}
            />
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <PageFooter />
    </div>
  );
}
