# To Do

- **! FIX fast refresh issues:**
  - Fast refresh only works when a file only exports components. Move your React context(s) to a separate file.
  - Fast refresh only works when a file only exports components. Use a new file to share constants or functions between components.

- Copy form on https://jofacademy.eu/registration.php
  - No border except when inputs are focused
  - Label: input horizontally aligned? Or...
  - MaterialUI Version: https://mui.com/material-ui/react-text-field/ implemented with Tailwind + CSS + React State?
    KypDurron — 14:32
    "Well I guess you could control the order of elements with some prop
    Like change the order tailwind class based on state
    But idk if you can get that nice transition there. Maybe.
    Wrap the label and input to flex and set the order with order class."
    KypDurron — 19:07
    This could be tricky. Basically absolute position with background on that label that then is over the border.
    Or some - margin hack
    Like margin top -10px

- Make lightsaber timeslots blue-er when selected.

- Do dark theme on Modal, style buttons.

- Refactor \_\_root.jsx focusing on separation of concerns

- Refactor larger component files, especially those which are 150+ lines

- Make final decision on which views are going where, e.g. have a landing page with "Create New Event" and "View Registered Events" links
