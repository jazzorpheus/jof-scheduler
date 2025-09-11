// Menu for checking full day, morning, afternoon, evening time windows
export default function CheckboxMenu({ windows, selectedSlots, onSelectSlot }) {
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

  return (
    <div className="flex flex-col items-center gap-2 mt-2">
      {/* Full Day */}
      <label
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          checked={fullDayChecked}
          onChange={handleFullDayChange}
          className="w-4 h-4"
        />
        Full Day
      </label>

      {/* Morning / Afternoon / Evening */}
      <div className="flex flex-col sm:flex-row sm:flex-nowrap justify-center gap-2 mt-1">
        {["morning", "afternoon", "evening"].map((period) => (
          <label
            key={period}
            className="flex items-center gap-1 px-3 py-1 text-xs bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="checkbox"
              checked={
                {
                  morning: morningChecked,
                  afternoon: afternoonChecked,
                  evening: eveningChecked,
                }[period]
              }
              onChange={(e) => handlePartDayChange(period, e)}
              className="w-3 h-3"
            />
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </label>
        ))}
      </div>
    </div>
  );
}
