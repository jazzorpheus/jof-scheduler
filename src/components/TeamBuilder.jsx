// Context
import { TeamsProvider, useTeams } from "../context/TeamsContext";

// Local Components
import Button from "./Button";
import EditableTeamRostersGrid from "./EditableTeamRostersGrid";

// Inputs that consume context
function NumTeamsInput() {
  const { numTeams, setNumTeams } = useTeams();
  return (
    <label className="flex items-center space-x-2">
      <span className="text-sm font-medium">Number of Teams</span>
      <input
        type="number"
        min={1}
        max={12}
        value={numTeams}
        onChange={(e) => setNumTeams(parseInt(e.target.value, 10) || 1)}
        className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </label>
  );
}

function RosterSizeInput() {
  const { rosterSize, setRosterSize } = useTeams();
  return (
    <label className="flex items-center space-x-2">
      <span className="text-sm font-medium">Players per Team</span>
      <input
        type="number"
        min={1}
        max={15}
        value={rosterSize}
        onChange={(e) => setRosterSize(parseInt(e.target.value, 10) || 1)}
        className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </label>
  );
}

export default function TeamBuilder() {
  return (
    <TeamsProvider>
      <div className="relative border rounded-lg p-4 shadow-sm bg-white w-full mx-auto mt-4">
        {/* Heading */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex items-center text-gray-600">
          <div className="border-t border-gray-300 flex-grow mr-3 -mt-1"></div>
          <h2 className="text-xl font-bold leading-none relative -top-0.7 bg-white px-2">
            Teams Builder
          </h2>
          <div className="border-t border-gray-300 flex-grow ml-3 -mt-1"></div>
        </div>

        {/* Controls row */}
        <div className="flex items-center space-x-4 mt-8 w-full">
          <NumTeamsInput />
          <RosterSizeInput />
        </div>

        {/* Teams grid */}
        <div className="mt-6">
          <EditableTeamRostersGrid />
        </div>
      </div>
    </TeamsProvider>
  );
}
