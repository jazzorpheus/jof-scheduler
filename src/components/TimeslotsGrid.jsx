// Local Components
import TimeslotCell from "./TimeslotCell";

// Displays grid of timeslots for the day from which users can select their availability
export default function TimeslotsGrid({
  timeslots,
  selectedSlots,
  highlightedSlot,
  highlightType,
  onSelect,
  onInfoClick,
}) {
  return (
    <div className="overflow-hidden w-full mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-3">
      {timeslots.map((slot) => (
        <TimeslotCell
          key={slot.timeslotId}
          slot={slot}
          isSelected={selectedSlots[slot.timeslotId] === true}
          highlightedSlot={highlightedSlot}
          highlightType={highlightType}
          onSelect={onSelect}
          onInfoClick={onInfoClick}
        />
      ))}
    </div>
  );
}
