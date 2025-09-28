import { createContext, useContext, useState } from "react";

const TeamsContext = createContext();
export const useTeams = () => useContext(TeamsContext);

export function TeamsProvider({ children }) {
  const [numTeams, setNumTeams] = useState(10);
  const [rosterSize, setRosterSize] = useState(4);

  // Initial teams array: 10 teams with gridPosition 1-10
  const [teams, setTeams] = useState(
    Array.from({ length: numTeams }, (_, i) => ({
      gridPosition: i + 1,
      name: `Team ${i + 1}`,
      players: [],
    }))
  );

  // Add or update player in a team
  const addPlayer = (gridPosition, playerName, index = null) => {
    setTeams((prev) =>
      prev.map((team) => {
        if (team.gridPosition !== gridPosition) return team;
        let newPlayers = [...team.players];
        if (index !== null) {
          newPlayers[index] = playerName;
        } else {
          newPlayers.push(playerName);
        }
        return { ...team, players: newPlayers };
      })
    );
  };

  // Remove player from a team
  const removePlayer = (gridPosition, index) => {
    setTeams((prev) =>
      prev.map((team) =>
        team.gridPosition === gridPosition
          ? { ...team, players: team.players.filter((_, i) => i !== index) }
          : team
      )
    );
  };

  // Rename a team
  const renameTeam = (gridPosition, newName) => {
    setTeams((prev) =>
      prev.map((team) =>
        team.gridPosition === gridPosition ? { ...team, name: newName } : team
      )
    );
  };

  // Update number of teams
  const updateNumTeams = (newNumTeams) => {
    setNumTeams(newNumTeams);

    setTeams((prev) => {
      const updated = [...prev];
      const currentCount = updated.length;

      // Increase: append new default teams
      if (newNumTeams > currentCount) {
        for (let i = currentCount + 1; i <= newNumTeams; i++) {
          updated.push({
            gridPosition: i,
            name: `Team ${i}`,
            players: [],
          });
        }
      }

      // Decrease: remove from the end
      if (newNumTeams < currentCount) {
        updated.splice(newNumTeams);
      }

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
        renameTeam,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
}
