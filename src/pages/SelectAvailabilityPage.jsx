// React
import { useState } from "react";

// Sample Data
import sampleTimeslots from "../data/sampleTimeslots24h.json";

// Custom Hooks
import { useLocale } from "../utils/lib/LocaleContext";

// Local Utilities
import { groupByDay } from "../utils/lib/groupByDay";

// Local Components
import DayCard from "../components/DayCard";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";

// Page for selecting available timeslots
export default function SelectAvailabilityPage() {
  // Read from context
  const { locale, timeZone } = useLocale();

  // Group timeslots by day using the user's locale & time zone
  const days = groupByDay(sampleTimeslots, { locale, timeZone });

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
    <div className="min-h-screen bg-gray-50 dark:bg-jof-blue-900">
      {/* HEADER */}
      <PageHeader title="Select Your Availability">
        You don't have to be 100% certain you can make it to all the slots you
        select — we just want an idea of times people tend to be available.
      </PageHeader>

      {/* MAIN CONTENT */}
      <main className="mx-auto max-w-5xl flex-1 px-4 pt-8 pb-5">
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
