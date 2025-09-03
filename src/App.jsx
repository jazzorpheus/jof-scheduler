// Sample Data
import sampleTimeslots from "./data/sampleTimeslots24h.json";

// Local Components
import DayCard from "./components/DayCard";

// Group timeslots by day
const groupByDay = (timeslots) => {
  const days = {};
  timeslots.forEach((slot) => {
    const day = slot.datetime.split("T")[0];
    if (!days[day]) days[day] = [];
    days[day].push(slot);
  });
  return days;
};

export default function App() {
  const timeslotsByDay = groupByDay(sampleTimeslots);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-4">
      {Object.entries(timeslotsByDay).map(([day, slots]) => (
        <DayCard key={day} day={day} timeslots={slots} />
      ))}
    </div>
  );
}
