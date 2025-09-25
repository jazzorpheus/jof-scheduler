// TeamsContext.jsx
import { createContext, useContext, useState } from "react";

const TeamsContext = createContext();
export const useTeams = () => useContext(TeamsContext);

export function TeamsProvider({ children }) {
  const [numTeams, setNumTeams] = useState(10);
  const [rosterSize, setRosterSize] = useState(4);

  // teams object: { "Team 1": [], "Team 2": [], ... }
  const [teams, setTeams] = useState(
    Object.fromEntries(
      Array.from({ length: numTeams }, (_, i) => [`Team ${i + 1}`, []])
    )
  );

  // Add player to a team (capped at rosterSize)
  const addPlayer = (teamName, playerName) => {
    setTeams((prev) => ({
      ...prev,
      [teamName]: [...(prev[teamName] || []), playerName].slice(0, rosterSize),
    }));
  };

  // Remove player from a team
  const removePlayer = (teamName, index) => {
    setTeams((prev) => ({
      ...prev,
      [teamName]: prev[teamName].filter((_, i) => i !== index),
    }));
  };

  // Rename a team
  const renameTeam = (oldName, newName) => {
    setTeams((prev) => {
      const entries = Object.entries(prev);
      const updatedEntries = entries.map(([name, players]) =>
        name === oldName ? [newName, players] : [name, players]
      );
      return Object.fromEntries(updatedEntries);
    });
  };

  // Adjust teams if numTeams changes
  const updateNumTeams = (newNumTeams) => {
    setNumTeams(newNumTeams);
    setTeams((prev) => {
      const updated = { ...prev };

      // Add new teams if increasing
      for (let i = 1; i <= newNumTeams; i++) {
        const teamName = `Team ${i}`;
        if (!updated[teamName]) updated[teamName] = [];
      }

      // Remove teams if decreasing
      Object.keys(updated).forEach((key) => {
        const teamNumber = parseInt(key.split(" ")[1], 10);
        if (teamNumber > newNumTeams) delete updated[key];
      });

      return updated;
    });
  };

  return (
    <TeamsContext.Provider
      value={{
        teams,
        numTeams,
        rosterSize,
        setRosterSize,
        setNumTeams: updateNumTeams,
        addPlayer,
        removePlayer,
        renameTeam, // <-- added
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
}
