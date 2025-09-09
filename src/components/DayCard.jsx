// React
import { useState } from "react";

// Third-Party Libraries
import clsx from "clsx";
// eslint-disable-next-line no-unused-vars
import { motion } from "motion/react";

// Local Components
import Modal from "./Modal";
import DayCardHead from "./DayCardHead";
import TimeslotCell from "./TimeslotCell";

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

  const morningChecked = windows.morning.every(
    (s) => selectedSlots[s.timeslotId]
  );
  const afternoonChecked = windows.afternoon.every(
    (s) => selectedSlots[s.timeslotId]
  );
  const eveningChecked = windows.evening.every(
    (s) => selectedSlots[s.timeslotId]
  );
  const fullDayChecked = windows.fullday.every(
    (s) => selectedSlots[s.timeslotId]
  );

  const toggleWindow = (window, checked) => {
    windows[window].forEach((slot) => {
      const isSelected = selectedSlots[slot.timeslotId];
      if (checked && !isSelected) onSelectSlot(slot.timeslotId);
      if (!checked && isSelected) onSelectSlot(slot.timeslotId);
    });
  };

  const handleFullDayChange = (e) => toggleWindow("fullday", e.target.checked);
  const handlePartDayChange = (window, e) =>
    toggleWindow(window, e.target.checked);

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

  return (
    // Animate DayCard expansion into full timeslots grid
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
        handleFullDayChange={handleFullDayChange}
        handlePartDayChange={handlePartDayChange}
        morningChecked={morningChecked}
        afternoonChecked={afternoonChecked}
        eveningChecked={eveningChecked}
        fullDayChecked={fullDayChecked}
      />

      {/* Timeslots grid */}
      {isOpen && (
        <div className="overflow-hidden w-full mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-3">
          {timeslots.map((slot) => {
            return (
              <TimeslotCell
                key={slot.timeslotId}
                slot={slot}
                isSelected={selectedSlots[slot.timeslotId] === true}
                highlightedSlot={highlightedSlot}
                highlightType={highlightType}
                onSelect={handleSelectSlot}
                onInfoClick={setSelectedSlot} // or your modal open handler
              />
            );
          })}
        </div>
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
