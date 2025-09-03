# NOTES

## To Do

- Design basic schema for:

  - Event,
  - Teams,
  - Users,
  - TimeSlots.

- Begin implementing "Create new event" form to be filled out by Admin.

- Begin implementing initial User view to register for event.

- Begin implementing second User view to register available timeslots.

- Rather than 3 clicks to register a slot, put register button on time itself i.e. on 16:00:00 button, and add an "i" or "Details" button to get info on registered participants

- Go for 24 (1/H) timeslots as default but cap event creation to 15 days (half month)? Have expandable days which leads to slots for that day. Also have a select all option, which then allows deselection if needed.

- Need a separate "registration" view and a "summary table" view of matching/overlapping slots for entire tourny participants, with a capability to select and filter down to certain teams. E.g. filter down to one team (your team), then a second team you want to play, or even three teams, or more...
  NOTE: can render complete list of vacant timeslots on frontend without having to create that data in database, but once users register a specific timeslot, that slot gets created in database. (Makes sure not to waste database space.)

## Questions

1. Been using JS for now, but would it be better to switch to TS? If so, should do it right away. I've only done a crash course in it before, but can learn as I go... How much benefit would we get with TS vs. JS?
