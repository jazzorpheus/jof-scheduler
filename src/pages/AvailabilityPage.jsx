// React
import { useState } from "react";

// Local Components
import DayCard from "../components/DayCard";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";

// Page for selecting available timeslots
export default function AvailabilityPage({
  days,
  selectedSlots,
  handleSelectSlots,
}) {
  const [openStates, setOpenStates] = useState(
    days.reduce((acc, day) => {
      acc[day.date] = false;
      return acc;
    }, {})
  );

  const toggleSingle = (date) => {
    setOpenStates((prev) => ({ ...prev, [date]: !prev[date] }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <PageHeader title="Select Your Availability">
        Please select your availability from the timeslots below. You don't have
        to be 100% certain you can make it to all the slots you select — we just
        want an idea of times people tend to be available.
      </PageHeader>

      {/* MAIN CONTENT */}
      <main className="max-w-5xl mx-auto px-4 flex-1 pb-20">
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
