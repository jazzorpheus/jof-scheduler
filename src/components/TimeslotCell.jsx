// Third-Party Packages
import clsx from "clsx";

// Icons
import { Info } from "lucide-react";

// Local Components
import Button from "./Button";

export default function TimeslotCell({
  slot,
  isSelected,
  highlightedSlot,
  highlightType,
  onSelect,
  onInfoClick,
}) {
  const handleClick = () => onSelect(slot.timeslotId);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "relative px-2 py-2 rounded-xl text-sm font-medium flex justify-between items-center cursor-pointer transition-colors dark:text-white dark:bg-jof-blue-light-med",
        isSelected
          ? "bg-green-200 hover:bg-green-300 dark:text-white dark:hover:jof-blue-dark"
          : "bg-gray-100 hover:bg-gray-200 dark:hover:bg-jof-blue-light",
        highlightedSlot === slot.timeslotId &&
          (highlightType === "select"
            ? "animate-slotHighlight-green"
            : "animate-slotHighlight-red")
      )}
    >
      {/* Timeslot time */}
      <span className="font-mono text-sm tabular-nums">
        {slot.datetime.split("T")[1].slice(0, 5)}
      </span>

      {/* Selected label */}
      {isSelected && (
        <span className="ml-2 text-green-700 text-xs font-semibold">
          Selected
        </span>
      )}

      {/* Action buttons */}
      <div
        className="flex items-center gap-1 ml-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Button info title="View details" onClick={() => onInfoClick(slot)}>
          <Info size={16} />
        </Button>
      </div>
    </div>
  );
}
