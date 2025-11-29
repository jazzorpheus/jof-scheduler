# To Do

- Finalize hamburger menu styling choices

- [ ] Restructure routing:
  - Design Landing Page: "Create New Event" and "View Registered Events" links, navbar not showing yet.
  - Once either is clicked, usual navbar shows up (need to add View Registered Events link to navbar).
  - Home link on navbar takes users back to landing page.
  - Conditionally render "View Registered Events" link based on token presence.



- [ ] Refactor \_\_root.jsx focusing on separation of concerns

- [ ] Refactor larger component files, especially those which are 150+ lines

- [ ] Decide whether it's worth connecting Create Event to Select Availability purely in frontend, or go straight to wiring up Create Event to backend and then Select Availability "pulls" relevant data from backend.

- [ ] Discuss "Plan Match" view, decide main features etc.

- [ ] **! FIX fast refresh issues:**
  - [ ] Fast refresh only works when a file only exports components. Move your React context(s) to a separate file.
  - [ ] Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.
