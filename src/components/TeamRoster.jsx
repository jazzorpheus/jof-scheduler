// Display a single team's current roster
export default function TeamRoster({ teamName, teamPlayers, rosterSize }) {
  return (
    <div className="border rounded-lg p-2 bg-gray-50 flex flex-col">
      <p className="font-medium text-sm mb-1">{teamName}</p>
      <ul className="list-disc list-inside text-xs flex-1 space-y-5">
        {Array.from({ length: rosterSize }).map((_, i) => (
          <li key={i}>{teamPlayers[i] || "---"}</li>
        ))}
      </ul>
    </div>
  );
}
