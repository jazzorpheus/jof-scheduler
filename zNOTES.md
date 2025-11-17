# To Do

- [ ] Do dark theme on Modal
  - [x] Add subtle gradient to checkbox menu backgrounds
  - [x] Remove borders on rosters
  - [x] Try adding subtle border to entire modal
  - [ ] Fine- [ ]tune things a little to be nicer

- [ ] DayCard expansions janky and border momentarily appears - [ ]- [ ] Fix.

- [ ] Refactor \_\_root.jsx focusing on separation of concerns

- [ ] Refactor larger component files, especially those which are 150+ lines

- [ ] Decide whether it's worth connecting Create Event to Select Availability purely in frontend, or go straight to wiring up Create Event to backend and then Select Availability "pulls" relevant data from backend.

- [ ] Design Landing Page: "Create New Event" and "View Registered Events"

- [ ] Discuss "Plan Match" view, decide main features etc.

- [ ] **! FIX fast refresh issues:**
  - [ ] Fast refresh only works when a file only exports components. Move your React context(s) to a separate file.
  - [ ] Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.
