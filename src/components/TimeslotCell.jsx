import { useState, useEffect } from "react";
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

  // Track if user has interacted with this slot at least once
  useEffect(() => {
    if (isSelected) setWasInteracted(true);
  }, [isSelected]);

  const handleClick = () => {
    onSelect(slot.timeslotId);
    setWasInteracted(true);
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "relative px-2 py-2 rounded-xl text-sm flex justify-between items-center cursor-pointer transition-colors dark:text-white dark:bg-jof-blue-med-light",
        "saber-blade-blue",
        isSelected
          ? "animate-ignite glow-flash glow-steady"
          : wasInteracted && "animate-extinguish"
      )}
    >
      <span
        className={clsx(
          "font-mono text-sm tabular-nums",
          isSelected && "text-gray-800 font-bold"
        )}
      >
        {slot.datetime.split("T")[1].slice(0, 5)}
      </span>

      {isSelected && (
        <span className="ml-2 text-xs font-bold text-gray-800">Selected</span>
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
              ? "text-gray-500 border-slate-400 dark:border-slate-200 hover:text-blue-500 dark:hover:text-white"
              : "hover:text-blue-500 dark:border-white dark:text-jof-blue-med-light dark:hover:border-jof-blue-med-light"
          }
          onClick={() => onInfoClick(slot)}
        >
          <Info size={16} />
        </Button>
      </div>
    </div>
  );
}
