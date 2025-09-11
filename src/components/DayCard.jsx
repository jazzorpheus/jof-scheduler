// React
import { useState } from "react";

// Third-Party Libraries
import clsx from "clsx";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// Local Components
import Modal from "./Modal";
import DayCardHead from "./DayCardHead";
import TimeslotsGrid from "./TimeslotsGrid";

export default function DayCard({
  day,
  timeslots,
  selectedSlots,
  onSelectSlot,
  isOpen,
  onToggle,
}) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [highlightedSlot, setHighlightedSlot] = useState(null);
  const [highlightType, setHighlightType] = useState(null);

  const getHour = (slot) => new Date(slot.datetime).getHours();

  const windows = {
    morning: timeslots.filter((s) => getHour(s) >= 6 && getHour(s) <= 11),
    afternoon: timeslots.filter((s) => getHour(s) >= 12 && getHour(s) <= 17),
    evening: timeslots.filter((s) => getHour(s) >= 18 && getHour(s) <= 23),
    fullday: timeslots,
  };

  const handleSelectSlot = (slotId) => {
    const isCurrentlySelected = selectedSlots[slotId];
    onSelectSlot(slotId);

    setHighlightedSlot(slotId);
    setHighlightType(isCurrentlySelected ? "deselect" : "select");

    setTimeout(() => {
      setHighlightedSlot(null);
      setHighlightType(null);
    }, 500);
  };

  const selectedCount = timeslots.filter(
    (slot) => selectedSlots[slot.timeslotId]
  ).length;

  const checkboxMenuProps = {
    windows,
    selectedSlots,
    onSelectSlot,
  };

  return (
    // Animate DayCard expansion into timeslots grid
    <motion.div
      layout={window.innerWidth >= 640}
      transition={{
        layout: { type: "tween", duration: 0.25, ease: "easeOut" },
      }}
      className={clsx(
        "border rounded-xl shadow-sm bg-gray-50",
        isOpen ? "col-span-full" : ""
      )}
    >
      {/* DayCard Header */}
      <DayCardHead
        dayOfWeek={day.dayOfWeek}
        dayOfMonth={day.dayOfMonth}
        selectedCount={selectedCount}
        totalSlots={timeslots.length}
        isOpen={isOpen}
        onToggle={onToggle}
        checkboxMenuProps={checkboxMenuProps}
      />

      {/* Timeslots grid */}
      {isOpen && (
        <TimeslotsGrid
          timeslots={timeslots}
          selectedSlots={selectedSlots}
          highlightedSlot={highlightedSlot}
          highlightType={highlightType}
          onSelect={handleSelectSlot}
          onInfoClick={setSelectedSlot}
        />
      )}

      {/* Modal for displaying info on timeslot */}
      {selectedSlot && (
        <Modal
          slot={selectedSlot}
          onClose={() => setSelectedSlot(null)}
          selectedSlots={selectedSlots}
          onSelectSlot={handleSelectSlot}
        />
      )}
    </motion.div>
  );
}
