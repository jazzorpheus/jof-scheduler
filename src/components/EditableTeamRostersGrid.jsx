import { useTeams } from "../context/TeamsContext";
import EditableTeamRoster from "./EditableTeamRoster";

export default function EditableTeamRostersGrid() {
  const { teams, rosterSize, addPlayer, removePlayer } = useTeams();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
      {teams.map((team) => (
        <EditableTeamRoster
          key={team.gridPosition} // stable key
          gridPosition={team.gridPosition} // pass gridPosition
          teamName={team.name}
          teamPlayers={team.players}
          rosterSize={rosterSize}
          onAddPlayer={addPlayer}
          onRemovePlayer={removePlayer}
        />
      ))}
    </div>
  );
}
