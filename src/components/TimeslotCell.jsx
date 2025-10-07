import clsx from "clsx";
import { Info } from "lucide-react";
import Button from "./Button";

export default function TimeslotCell({
  slot,
  isSelected,
  onSelect,
  onInfoClick,
}) {
  const handleClick = () => onSelect(slot.timeslotId);

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "relative px-2 py-2 rounded-xl text-sm flex justify-between items-center cursor-pointer transition-colors dark:text-white dark:bg-jof-blue-med-light",
        "saber-blade-blue",
        isSelected
          ? "animate-ignite glow-flash glow-steady"
          : "animate-extinguish"
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
          className={clsx(isSelected && "text-black")}
          onClick={() => onInfoClick(slot)}
        >
          <Info size={16} />
        </Button>
      </div>
    </div>
  );
}
