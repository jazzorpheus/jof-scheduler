# To Do

- [ ] Have a max-width on page header such that it takes up more space on narrower screens, e.g. max-width: Xpx

- [ ] Modal:
  - [x] Add subtle gradient to checkbox menu backgrounds
  - [x] Remove borders on rosters
  - [x] Try adding subtle border to entire modal
  - [x] Lighten rose shade on cancel button
  - [x] Add transparent (opacity: 0) borders to confirm buttons
  - Kyp: "..or just border-transparent
    then it puts transparent as the color
    i wonder how it looks if instead of border color on hover you switch the gradient from top to bottom"
  - [ ] Add functionality to close modal when clicking outside of it

- [ ] DayCard expansions janky and border momentarily appears - [ ]- [ ] Fix.

- [ ] Refactor \_\_root.jsx focusing on separation of concerns

- [ ] Refactor larger component files, especially those which are 150+ lines

- [ ] Decide whether it's worth connecting Create Event to Select Availability purely in frontend, or go straight to wiring up Create Event to backend and then Select Availability "pulls" relevant data from backend.

- [ ] Design Landing Page: "Create New Event" and "View Registered Events"

- [ ] Discuss "Plan Match" view, decide main features etc.

- [ ] **! FIX fast refresh issues:**
  - [ ] Fast refresh only works when a file only exports components. Move your React context(s) to a separate file.
  - [ ] Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.
