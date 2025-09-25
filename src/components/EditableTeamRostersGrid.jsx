// EditableTeamRostersGrid.jsx
import { useTeams } from "../context/TeamsContext";
import EditableTeamRoster from "./EditableTeamRoster";

export default function EditableTeamRostersGrid() {
  const { teams, rosterSize, addPlayer, removePlayer } = useTeams();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
      {Object.entries(teams).map(([teamName, teamPlayers]) => (
        <EditableTeamRoster
          key={teamName}
          teamName={teamName}
          teamPlayers={teamPlayers}
          rosterSize={rosterSize}
          onAddPlayer={addPlayer}
          onRemovePlayer={removePlayer}
        />
      ))}
    </div>
  );
}
