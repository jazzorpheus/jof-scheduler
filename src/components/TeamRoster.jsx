// Display a single team's current roster
export default function TeamRoster({ teamName, teamPlayers, rosterSize }) {
  return (
    <div className="border rounded-lg p-2 bg-gray-50 flex flex-col dark:bg-jof-blue-700 dark:border-jof-blue-light">
      <p className="font-medium text-sm mb-1 dark:text-jof-blue-light">
        {teamName}
      </p>
      <ul className="list-disc list-inside text-xs flex-1 space-y-5 dark:text-gray-100">
        {Array.from({ length: rosterSize }).map((_, i) => (
          <li key={i}>{teamPlayers[i] || "---"}</li>
        ))}
      </ul>
    </div>
  );
}
