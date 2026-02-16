// Local Components
import TeamRoster from "./TeamRoster";

// Render full grid of all team rosters
export default function TeamRostersGrid({ slotSelected, teams, rosterSize }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
      {teams.map((team) => {
        // Pull selected players for this team; default to empty array if none
        const selectedPlayers = slotSelected?.[team.id] || [];

        return (
          <TeamRoster
            key={team.id}
            teamName={team.name}
            teamPlayers={selectedPlayers}
            rosterSize={rosterSize}
          />
        );
      })}
    </div>
  );
}
