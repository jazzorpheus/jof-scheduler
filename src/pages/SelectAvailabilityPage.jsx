// React
import { useState, useMemo } from "react";

// Custom Hooks
import { useLocale } from "../context/LocaleContext";
import { useSelectedEvent } from "../context/EventContext";

// Local Utilities
import { groupByDay } from "../utils/lib/groupByDay";
import { generateTimeslotsForEvent } from "../utils/lib/generateTimeslotsForEvent";

// Local Components
import DayCard from "../components/DayCard";
import PageHeader from "../components/PageHeader";
import PageFooter from "../components/PageFooter";

export default function SelectAvailabilityPage() {
  const { locale, timeZone } = useLocale();
  const { selectedEvent } = useSelectedEvent();

  // Temporary: hard-coded team IDs for now
  const teamKeys = [
    "team_flaggots",
    "team_jediman",
    "team_idontgiveaflagidgaf",
    "team_rotkindlessteam",
    "team_theflagevarines",
    "team_jerkingonflags",
    "team_flag",
    "team_opcm",
    "team_creyonstinyfriends",
    "team_jimmytherentboys",
  ];

  // Generate timeslots dynamically for the selected event
  const timeslots = useMemo(() => {
    if (!selectedEvent) return [];
    return generateTimeslotsForEvent(selectedEvent, teamKeys);
  }, [selectedEvent]);

  // Group by day
  const days = useMemo(
    () => groupByDay(timeslots, { locale, timeZone }),
    [timeslots, locale, timeZone],
  );

  // Open/closed state per day
  const [openStates, setOpenStates] = useState(
    days.reduce((acc, day) => {
      acc[day.date] = false;
      return acc;
    }, {}),
  );

  // Selected slots
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

  if (!selectedEvent) {
    return (
      <div className="min-h-screen bg-slate-400 dark:bg-jof-blue-900 flex flex-col items-center justify-center text-white">
        <PageHeader title="No Event Selected">
          Please select an event from the View Events page first.
        </PageHeader>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-400 dark:bg-jof-blue-900">
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
