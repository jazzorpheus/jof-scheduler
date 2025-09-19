# NOTES

## To Do

- Design basic schema for:
  - [x] Event,
  - [x] TimeSlots,

- Refactor User view to register available timeslots into separate helper functions and/or components where appropriate.
  - [x] Create generic, highly reusable Button component
  - [x] Create Timeslot component
  - [x] Create DayCardHead component
  - [x] Create CheckboxMenu component
  - [x] Create PageBanner or PageHeader component
  - [x] Bottom of DayCardHead (when grid not expanded) is messed up.
  - [x] Create TeamRoster and TeamRostersGrid components
  - [x] Create TimeslotCell and TimeslotsGrid components
  - [x] Create PageHeader and PageFooter
  - [x] Create useDayCard custom hook
  - [x] Reduce AvailabilityPage header instructions size on narrower screens. (Make text take up full width, reduce title font size, etc.)

- Set up React Router
  - [x] Decide on suitable routing structure and pathnames that will mirror AWS / DynamoDB backend.
    - Idea so far is to have:
      1. **CreateEventPage**
      - doubles as landing page
      - admin creates a new event
      2. (HYPOTHETICAL) [**SignupEventPage**
      - participant "joins" an event (name, email, etc.)
      - linked from unique invite url]
      3. **SelectAvailabilityPage**
      - participant picks timeslots
      - URL carries eventId and token
      4. **PlanMatchPage**
      - open/public view of aggregated availability
      - highlight overlaps visually (heatmap, tags, etc?)
      - admin can "lock in" timeslots if 2 or more complete teams have signalled their potential availability via SelectAvailabilityPage. This sends out email to participants requiring confirmation to finalze match/event booking.

- [x] FIX modal scrolling issue with createPortal!

- **! FIX fast refresh issues:**
  - Fast refresh only works when a file only exports components. Move your React context(s) to a separate file.
  - Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.

- **"Create new event" form to be filled out by Admin.**
  - [ ] Decide on basic form fields and begin implementing a first draft with React Hook Form!

  Will need to contain at least the following fields:
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

- Initial User view showing events already registered to (via forum). Whichever event is "checked/selected" will change what User sees on subsequent pages, i.e. AvailabilityPage and PlanMatch page.

- For participants, need a separate "registration" view, then a "summary table/graphic" view to clearly display matching/overlapping slots for entire tourny participants, with capability to select and filter down to certain teams. E.g. filter down to one team (your team), then a second team you want to play, or even three teams, or more...
  NOTE: can render complete set of vacant timeslots on frontend without having to create that data in database, but once users register specific timeslots, they get created in database. (Makes sure not to waste database space.)

## Not Urgent / Future Ideas

- Enable clicking outside of modals to close them rather than forcing user to click "x" in top-right / pressing confirm or cancel button

## Questions

Remind me what the full backend + database stack is? DynamoDB, AWS Lambda, Amazon API Gateway? Anything else?
