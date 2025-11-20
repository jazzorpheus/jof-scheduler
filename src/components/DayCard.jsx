// Third-Party Libraries
import clsx from "clsx";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

// Custom Hooks
import { useDayCard } from "../hooks/useDayCard";

// Local Components
import Modal from "./Modal";
import DayCardHead from "./DayCardHead";
import TimeslotsGrid from "./TimeslotsGrid";

// Each day consists of a DayCardHead and expandable TimeslotsGrid
export default function DayCard({
  day,
  timeslots,
  selectedSlots,
  onSelectSlot,
  isOpen,
  onToggle,
}) {
  const {
    selectedSlot,
    setSelectedSlot,
    highlightedSlot,
    highlightType,
    handleSelectSlot,
    timeWindows,
    selectedCount,
    isLg,
  } = useDayCard(timeslots, selectedSlots, onSelectSlot);

  const checkboxMenuProps = {
    timeWindows,
    selectedSlots,
    onSelectSlot,
  };

  return (
    // Animate DayCard expansion into timeslots grid
    <motion.div
      layout={isLg}
      transition={{
        layout: { type: "tween", duration: 0.25, ease: "easeOut" },
      }}
      className={clsx(
        "shadow-sm overflow-hidden",
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
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
        >
          <TimeslotsGrid
            timeslots={timeslots}
            selectedSlots={selectedSlots}
            highlightedSlot={highlightedSlot}
            highlightType={highlightType}
            onSelect={handleSelectSlot}
            onInfoClick={setSelectedSlot}
          />
        </motion.div>
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
