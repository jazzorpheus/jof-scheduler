// React
import { useState, useMemo, useEffect } from "react";

// Extract the hour from a timeslot's datetime string
const getHour = (slot) => new Date(slot.datetime).getHours();

// Custom hook to manage the state and logic for a DayCard component
// Handles slot selection, highlighting, modal state, and calculates derived data like time windows and selected counts
export function useDayCard(timeslots, selectedSlots, onSelectSlot) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [highlightedSlot, setHighlightedSlot] = useState(null);
  const [highlightType, setHighlightType] = useState(null);
  const [isLg, setIsLg] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 640 : false
  );

  // Effect for handling window resize for layout animation
  useEffect(() => {
    const handleResize = () => {
      setIsLg(window.innerWidth >= 640);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Effect for clearing the highlight after a short delay
  useEffect(() => {
    if (highlightedSlot === null) return;

    const timer = setTimeout(() => {
      setHighlightedSlot(null);
      setHighlightType(null);
    }, 500);

    return () => clearTimeout(timer);
  }, [highlightedSlot]);

  const timeWindows = useMemo(
    () => ({
      morning: timeslots.filter((s) => getHour(s) >= 6 && getHour(s) <= 11),
      afternoon: timeslots.filter((s) => getHour(s) >= 12 && getHour(s) <= 17),
      evening: timeslots.filter((s) => getHour(s) >= 18 && getHour(s) <= 23),
      fullday: timeslots,
    }),
    [timeslots]
  );

  const handleSelectSlot = (slotId) => {
    const isCurrentlySelected = selectedSlots[slotId];
    onSelectSlot(slotId);

    setHighlightedSlot(slotId);
    setHighlightType(isCurrentlySelected ? "deselect" : "select");
  };

  const selectedCount = useMemo(
    () => timeslots.filter((slot) => selectedSlots[slot.timeslotId]).length,
    [timeslots, selectedSlots]
  );

  return {
    selectedSlot,
    setSelectedSlot,
    highlightedSlot,
    highlightType,
    handleSelectSlot,
    timeWindows,
    selectedCount,
    isLg,
  };
}
