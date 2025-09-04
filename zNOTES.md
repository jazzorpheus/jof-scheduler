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

- Add "convenient" All Day timeslot selection, plus Morning, Afternoon, Evening select options to DayCards (causes registers/ticks to relevant timeslots). Call Morning 6am-11am, Afternoon 12pm-5pm, Evening 6pm-11pm.

  - Feedback from Kyp:
    - Hmm. Could we think something else for the register button and those V X icons.
    - Maybe put just check mark there and once you click the element it becomes checked(like having border/background around it and invert colors once active and nonactive). And clicking that time again would make it not selected. So each of the timeslots would work as toggle. Then you wouldn’t need that cross icon.
    - Also now when there’s those morning/evening checkboxes it’s not really clear that you can open each of those days.
    - Maybe could move those checkboxes under the day once it’s open.
      -Now as user I would just think I need to select full day/morning/evening but I have no clue I can actually pick those timeslots myself.

- Add Cancel button after registration in addition to tick icon on individual timeslots and info modal.

- For participants, need a separate "registration" view, then a "summary table/graphic" view to clearly display matching/overlapping slots for entire tourny participants, with capability to select and filter down to certain teams. E.g. filter down to one team (your team), then a second team you want to play, or even three teams, or more...
  NOTE: can render complete set of vacant timeslots on frontend without having to create that data in database, but once users register specific timeslots, they get created in database. (Makes sure not to waste database space.)

- For admins, need a "landing page" with "Create New Event" button, which takes them to an event creation form. Will need to contain at least the following fields:

  - Title
  - Description
  - Start Date
  - End Date
  - Admin Name / Username
  - Team Names
    - Team Members
  - Settings
    - Game Mode (e.g. Multi-Team Tournament, Free For All / 1v1 Tournament, 2-Teams Event, etc.)
      - E.g. Multi-Team Tournament would require at least:
        - Min Players per Team
        - Max Players per Team
        - Timeslot Duration (in hours, e.g. 0.5, 1, 1.5, etc.)
        - Timezone? Can later translate all timezones from UTC (at server end) to User end (UTC ± X based on User's timezone).

Then unique URL will be generated based on event title.

## Questions
