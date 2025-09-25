// Local Components
import TeamRoster from "./TeamRoster";

// Render full grid of all  team rosters
export default function TeamRostersGrid({ slotSelected, teams, rosterSize }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
      {Object.entries(slotSelected).map(([teamId, players]) => {
        const teamObj = teams.find((t) => t.id === teamId);
        const teamName = teamObj?.name || teamId;

        return (
          <TeamRoster
            key={teamId}
            teamName={teamName}
            teamPlayers={players}
            rosterSize={rosterSize}
          />
        );
      })}
    </div>
  );
}
