# To Do

- [ ] Fix rendering issue when going landing page -> create event where landing page links linger

- [ ] Add shimmering skeleton to pending components

- [ ] Light theme quick overhaul

- [ ] Figure out event creation schema + whether to have backend set up timeslot placeholders initially or dynamically create as users submit availability

- [ ] Refactor \_\_root.jsx focusing on separation of concerns

- [ ] Refactor larger component files, especially those which are 150+ lines

- [ ] Decide whether it's worth connecting Create Event to Select Availability purely in frontend, or go straight to wiring up Create Event to backend and then Select Availability "pulls" relevant data from backend.

- [ ] Discuss "Plan Match" view, decide main features etc.

- [ ] **! FIX fast refresh issues:**
  - [ ] Fast refresh only works when a file only exports components. Move your React context(s) to a separate file.
  - [ ] Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.
