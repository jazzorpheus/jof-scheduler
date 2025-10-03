import clsx from "clsx";
import { Info } from "lucide-react";
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
        "relative px-2 py-2 rounded-xl text-sm flex justify-between items-center cursor-pointer transition-colors dark:text-white dark:bg-jof-blue-light-med",
        isSelected
          ? "saber-blade-blue"
          : "bg-gray-100 hover:bg-gray-200 dark:hover:bg-jof-blue-light",
        highlightedSlot === slot.timeslotId &&
          (highlightType === "select"
            ? "animate-slotHighlight-blue"
            : "animate-slotHighlight-red")
      )}
    >
      <span
        className={clsx(
          "font-mono text-sm tabular-nums",
          isSelected && "text-black font-bold"
        )}
      >
        {slot.datetime.split("T")[1].slice(0, 5)}
      </span>

      {isSelected && (
        <span className="ml-2 text-xs font-bold text-black">Selected</span>
      )}

      <div
        className="flex items-center gap-1 ml-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          info
          title="View details"
          className={clsx(isSelected && "text-black")}
          onClick={() => onInfoClick(slot)}
        >
          <Info size={16} />
        </Button>
      </div>
    </div>
  );
}
