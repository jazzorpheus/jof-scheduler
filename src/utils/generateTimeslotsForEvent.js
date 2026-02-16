// utils/generateTimeslotsForEvent.js

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
  const start = new Date(`${event.startDate}T00:00:00Z`);
  const end = new Date(`${event.endDate}T23:00:00Z`);

  const oneHourMs = 1000 * 60 * 60;
  let current = new Date(start);

  // Hardcoded current player for testing
  const currentPlayer = { id: "plyr_a1b2c3", name: "Akr" };

  while (current <= end) {
    const slotId = `ts${Math.floor(current.getTime() / 1000)}`;
    const selected = {};

    // initialize empty arrays for each team
    teamKeys.forEach((teamId) => {
      // Pre-fill currentPlayer in the first team for demo purposes
      selected[teamId] = teamId === teamKeys[0] ? [currentPlayer.id] : [];
    });

    timeslots.push({
      timeslotId: slotId,
      eventId: event.id,
      datetimeUtc: current.toISOString(),
      selected, // { teamId: [playerId, ...], ... }
    });

    current = new Date(current.getTime() + oneHourMs);
  }

  return timeslots;
}
