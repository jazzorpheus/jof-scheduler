import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { Info } from "lucide-react";
import Button from "./Button";

export default function TimeslotCell({
  slot,
  isSelected,
  onSelect,
  onInfoClick,
}) {
  const [wasInteracted, setWasInteracted] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const prevSelected = useRef(isSelected);

  const timeFmt = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  // Track if user has interacted with this slot at least once
  useEffect(() => {
    if (isSelected) {
      setWasInteracted(true);
    }
  }, [isSelected]);

  // Handle animation logic
  useEffect(() => {
    // If transitioning from unselected to selected, animate
    if (isSelected && !prevSelected.current) {
      setShouldAnimate(true);
    }
    // If transitioning from selected to unselected, stop animation state
    else if (!isSelected) {
      setShouldAnimate(false);
    }

    // Update ref for next render
    prevSelected.current = isSelected;
  }, [isSelected]);

  const handleClick = () => {
    onSelect(slot.timeslotId);
    setWasInteracted(true);
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "relative px-2 py-2 my-[2px] rounded-xl text-sm flex justify-between items-center cursor-pointer transition-colors text-slate-900 bg-gradient-to-b from-slate-300 to-slate-300/30 hover:bg-gradient-to-b hover:from-slate-200/80 hover:to-slate-200/30 dark:text-white dark:bg-gradient-to-b dark:from-jof-blue-600 dark:to-jof-blue-900 dark:hover:bg-gradient-to-b dark:hover:from-jof-blue-500 dark:hover:to-jof-blue-800",
        "saber-blade-blue",
        isSelected
          ? shouldAnimate
            ? "animate-ignite glow-flash glow-steady"
            : "ignited glow-steady"
          : wasInteracted && "animate-extinguish",
      )}
    >
      <span
        className={clsx(
          "font-mono text-sm tabular-nums",
          isSelected && "text-slate-800 dark:text-gray-800 font-bold",
        )}
      >
        {timeFmt.format(new Date(slot.datetimeUtc))}
      </span>

      {isSelected && (
        <span className="ml-2 text-xs font-bold text-slate-700 dark:text-gray-800">
          Selected
        </span>
      )}

      <div
        className="flex items-center gap-1 ml-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          info
          title="View details"
          className={
            !isSelected
              ? "text-slate-500 hover:text-slate-700 dark:text-gray-400 dark:hover:text-white"
              : "text-slate-500 hover:text-slate-700 dark:text-jof-blue-400 dark:hover:text-jof-blue-600"
          }
          onClick={() => onInfoClick(slot)}
        >
          <Info size={16} />
        </Button>
      </div>
    </div>
  );
}
