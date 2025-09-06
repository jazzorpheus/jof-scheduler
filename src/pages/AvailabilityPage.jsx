// React
import React from "react";

// Local Components
import DayCard from "../components/DayCard";

export default function AvailabilityPage({
  days,
  registeredSlots,
  handleRegister,
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="w-full bg-white shadow-md p-4 mb-6 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-2">Select Your Availability</h1>
          <p className="text-gray-600">
            Please select your availability for the timeslots below. You
            don&apos;t have to be 100% certain that you can make all selected
            slots — this is just to get an idea of overlapping times that might
            work for people.
          </p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {days.map((day) => (
            <DayCard
              key={day.date}
              day={day}
              timeslots={day.timeslots}
              registeredSlots={registeredSlots}
              onRegister={handleRegister}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
