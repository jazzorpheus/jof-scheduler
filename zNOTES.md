# To Do

- Change events schema so players is an array of objects with id and name instead of just name.

- Update relevant code to work with this.

- Wire up TeamBuilder to formData and integrate into workflow so new events don't crash app!

- Come up with way of indicating which event is currently selected on select availability page

- Begin final stage of pipeline: sending off player availability to "backend", which then goes to Plan Match page.

- [ ] Need a check to ensure player names entered into TeamBuilder are unique before form submission.

- [ ] Discuss "Plan Match" view, decide main features etc.

- [ ] Refactor \_\_root.jsx focusing on separation of concerns

- [ ] Refactor larger component files, especially those which are 150+ lines

- [ ] **! FIX fast refresh issues:**
  - [ ] Fast refresh only works when a file only exports components. Move your React context(s) to a separate file.
  - [ ] Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.
