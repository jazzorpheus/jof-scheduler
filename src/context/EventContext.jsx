import { createContext, useContext, useState } from "react";

const SelectedEventContext = createContext(null);

export function EventProvider({ children }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const selectEvent = (event) => {
    setSelectedEvent(event);
  };

  const clearSelectedEvent = () => {
    setSelectedEvent(null);
  };

  return (
    <SelectedEventContext.Provider
      value={{ selectedEvent, selectEvent, clearSelectedEvent }}
    >
      {children}
    </SelectedEventContext.Provider>
  );
}

export function useSelectedEvent() {
  const context = useContext(SelectedEventContext);
  if (!context) {
    throw new Error("useSelectedEvent must be used within a EventProvider");
  }
  return context;
}
