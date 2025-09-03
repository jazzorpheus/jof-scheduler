# NOTES

## To Do

- Design basic schema for:

  - Event,
  - TimeSlots,
  - Teams?
  - Users?

- Begin implementing "Create new event" form to be filled out by Admin.

- Begin implementing initial User view to register for event.

- Begin implementing second User view to register available timeslots.

- Decide if new "multiple DayCards per row is worth it" and merge or delete branch

- Add Cancel button after registration in addition to tick icon

- Need a separate "registration" view and a "summary table" view of matching/overlapping slots for entire tourny participants, with a capability to select and filter down to certain teams. E.g. filter down to one team (your team), then a second team you want to play, or even three teams, or more...
  NOTE: can render complete list of vacant timeslots on frontend without having to create that data in database, but once users register a specific timeslot, that slot gets created in database. (Makes sure not to waste database space.)

## Questions
