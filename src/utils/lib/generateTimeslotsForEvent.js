// utils//lib/generateTimeslotsForEvent.js

/**
 * Generates hourly timeslots for an event between startDate and endDate
 * @param {object} event - the selected event
 * @param {string} event.id - event ID
 * @param {string} event.startDate - YYYY-MM-DD
 * @param {string} event.endDate - YYYY-MM-DD
 * @param {Array<string>} teamKeys - array of all team IDs
 * @returns {Array} array of timeslot objects
 */
export function generateTimeslotsForEvent(event, teamKeys = []) {
  const timeslots = [];
  const start = new Date(event.startDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(event.endDate);
  end.setHours(23, 0, 0, 0); // last hour of the day

  const oneHourMs = 1000 * 60 * 60;
  let current = new Date(start);

  while (current <= end) {
    const slotId = `ts${Math.floor(current.getTime() / 1000)}`;
    const selected = {};

    // initialize empty arrays for each team
    teamKeys.forEach((team) => {
      selected[team] = [];
    });

    timeslots.push({
      timeslotId: slotId,
      eventId: event.id,
      datetime: current.toISOString().slice(0, 19), // "YYYY-MM-DDTHH:MM:SS"
      selected,
    });

    current = new Date(current.getTime() + oneHourMs);
  }

  return timeslots;
}
