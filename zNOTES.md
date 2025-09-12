# NOTES

## To Do

- Design basic schema for:

  - [x] Event,
  - [x] TimeSlots,

- Refactor User view to register available timeslots into separate helper functions and/or components where appropriate.

  - [x] Create generic, highly reusable Button component
  - [x] Create Timeslot component
  - [x] Create DayCardHead component
  - [x] Create TeamRoster component
  - [x] Create CheckboxMenu component
  - [x] Create PageBanner or PageHeader component
  - [x] Bottom of DayCardHead (when grid not expanded) is messed up :S
  - [ ] Reduce AvailabilityPage header instructions size on narrower screens. (Make text take up full width, reduce title font size, etc.)

- **"Create new event" form to be filled out by Admin.**

  - [ ] Decide on basic form fields and begin implementing a first draft with React Hook Form!

  Need a "landing page" with "Create New Event" button, which takes them to an event creation form. Will need to contain at least the following fields:

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

- Initial User view to register for event.

- For participants, need a separate "registration" view, then a "summary table/graphic" view to clearly display matching/overlapping slots for entire tourny participants, with capability to select and filter down to certain teams. E.g. filter down to one team (your team), then a second team you want to play, or even three teams, or more...
  NOTE: can render complete set of vacant timeslots on frontend without having to create that data in database, but once users register specific timeslots, they get created in database. (Makes sure not to waste database space.)

## Questions
