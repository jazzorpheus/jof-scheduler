# To Do

- [ ] Set up mock API in frontend for testing form/event schema and GETing/POSTing data.
  - Write algorithm to create a unique event id from event title
  - Come up with way of indicating which event is currently selected on select availability page
  - Integrate the team builder into form data submitted to handlers (for now assume event is 2+ team tournament, i.e. jofball or ctf tourny)
  - Begin final stage of pipeline: sending off player availability to "backend", which then goes to Plan Match page.

- [ ] Refactor \_\_root.jsx focusing on separation of concerns

- [ ] Refactor larger component files, especially those which are 150+ lines

- [ ] Discuss "Plan Match" view, decide main features etc.

- [ ] **! FIX fast refresh issues:**
  - [ ] Fast refresh only works when a file only exports components. Move your React context(s) to a separate file.
  - [ ] Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.
