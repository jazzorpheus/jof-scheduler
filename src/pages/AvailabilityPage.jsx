// React
import { useState } from "react";

// Local Components
import DayCard from "../components/DayCard";
import PageFooter from "../components/PageFooter";

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* HEADER */}
      <header className="w-full bg-white shadow-md p-6 mb-8 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-2">Select Your Availability</h1>
          <p className="text-gray-600 text-md">
            Please select your availability for the timeslots below. You don't
            have to be 100% certain that you can make all selected slots — this
            is just to get an idea of overlapping times that <i>might</i> work
            for people.
          </p>
        </div>
      </header>

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
