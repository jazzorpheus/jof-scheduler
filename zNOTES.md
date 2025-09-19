# To Do

- **! FIX fast refresh issues:**
  - Fast refresh only works when a file only exports components. Move your React context(s) to a separate file.
  - Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.

### **"Create new event" form to be filled out by Admin.**

**1. Scaffold layout (no complex state yet)**

- Static form: event title/desc/dates, a “Teams” panel and an empty “Rosters” panel that uses the TeamRoster component you already have.
- Acceptance: nothing breaks; the roster panel shows placeholders.

**2. Local state model for teams (start with useState)**

- Keep teams as an array of objects { id, name, members: [] }. Use a UUID or slug for id.

- Add an “Add team” input + button that appends a team object to the array. As soon as the team is appended the Rosters panel renders a TeamRoster placeholder for it.

- Acceptance: typing a name + hitting Add shows roster placeholder immediately.

**3. Team editor: add/remove members UI per team**

- Each team gets its own small editor (inline or an accordion). Editor has: member name input, Add member button, remove button per member, captain toggle.

- When you add a member it pushes into team.members and the TeamRoster updates immediately (props). Enforce members.length <= 4. Show small inline error or disable add if full.

- Acceptance: live roster updates, max-4 enforced.

**4. Validation & uniqueness rules**

- Validate team name uniqueness, empty names, and duplicate member names (optional). Show unobtrusive feedback.

- Acceptance: prevents duplicate team names.

**5. Persisting to the event schema**

- Map local state to your sampleEvent shape on Save (generate proper ids for teams/members). No API yet — just a console.log or download JSON.

- Acceptance: sampleEvent structure is produced and looks like your example.

**6. Timeslot creation + selection (next)**

- Provide a simple timeslot builder (date + time rows) and per-timeslot per-team selections. This can be added after teams are stable.

- Acceptance: timeslot objects match sampleTimeslots shape.

**7. Polish: move to React Hook Form (optional)**

- If you want complex validation and neat form submission, convert to RHF with useFieldArray for teams and nested members. But do this only after the UI behaviour is nailed.

### **Component breakdown (small, testable units)**

- CreateEventForm — top level; holds event metadata and teams state (initially local useState).

- TeamsPanel — shows list of TeamCard and “Add team” control.

- TeamCard / TeamEditor — inline editor for a single team (name input, add member input, member list, captain toggle, remove team).

- TeamRoster — your existing component; receives teamName, teamMembers, rosterSize. Renders the placeholder/filled roster.

- TimeslotBuilder & TimeslotPicker — separate area for building timeslots and collecting team availability.

- SaveButton — serializes state to sampleEvent + sampleTimeslots.

### **State shape (how your in-memory objects should look)**

- Top-level event (keeps metadata and teams): matches your sampleEvent—teams: [ { id, name, members: [ { id, name, captain } ] } ].

- timeslots array: each entry { timeslotId, eventId, datetime, selected: { [teamId]: [memberNames] } }.
  Design with these shapes in mind so the save step is trivial.

### **UX details for the tricky “add new team” bit**

- Workflow: admin types team name → hits Add Team → append team object and immediately render TeamRoster placeholder in the roster grid. That placeholder should contain a focused “Add member” input or a small “Edit roster” affordance.

- Keep each team editor localized: each TeamCard should own ephemeral inputs (e.g., the new member text field), but updates write to the shared teams array.

- Live update: TeamRoster consumes teams[i].members.map(m => m.name) so changes are visible instantly.

- Member add UX: pressing Enter or clicking Add should push the member into the specific team’s array. If the team is at 4 members disable input and show “Roster full (4)”.

- ID strategy: make team/member ids locally unique (e.g. team-<slug> or team-<uuid>). Keep them stable until save.

### **Implementation choices and tradeoffs**

- Start with useState (recommended for speed): easier to reason about, quick to debug. Convert to RHF later if you need advanced validation or performance.

- React Hook Form + useFieldArray: more robust for nested arrays and form submission but higher initial complexity — good if you expect many more fields/conditions.

- Controlled components vs uncontrolled inputs: controlled works fine here and keeps model-sync predictable. If you go RHF you’ll mix uncontrolled inputs but still get good validation.

### **Edge cases & tests to keep in mind**

- Duplicate team names — block or auto-rename.

- Removing a team should optionally ask to confirm if members exist.

- Member name collisions across teams (probably fine).

- Partial saves and rehydrates — if you persist drafts, ensure ids remain stable.

- Mobile layout — roster grid should collapse to a vertical list.

### **Accessibility & polish**

- Keyboard-first: Enter to add member; Esc to cancel.

- Use aria-invalid on inputs that fail validation.

- Make the roster placeholders visually distinct so admin knows which teams still need members.

Then unique URL will be generated based on event title.

## Not Urgent / Future Ideas

- Initial User view showing events already registered to (via forum). Whichever event is "checked/selected" will change what User sees on subsequent pages, i.e. AvailabilityPage and PlanMatch page.

- Enable clicking outside of modals to close them rather than forcing user to click "x" in top-right / pressing confirm or cancel button

## Questions

Remind me what the full backend + database stack is? DynamoDB, AWS Lambda, Amazon API Gateway? Anything else?
