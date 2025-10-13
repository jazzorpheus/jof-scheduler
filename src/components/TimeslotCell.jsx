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
        "relative px-2 py-2 my-[2px] rounded-xl text-sm flex justify-between items-center cursor-pointer transition-colors dark:text-white dark:bg-gradient-to-b dark:from-jof-blue-600 dark:to-jof-blue-900 dark:hover:bg-gradient-to-b dark:hover:from-jof-blue-500 dark:hover:to-jof-blue-800",
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
              ? "text-gray-500 hover:text-blue-500 dark:hover:text-white"
              : "hover:text-white dark:text-jof-blue-600 dark:hover:text-jof-blue-400"
          }
          onClick={() => onInfoClick(slot)}
        >
          <Info size={16} />
        </Button>
      </div>
    </div>
  );
}
