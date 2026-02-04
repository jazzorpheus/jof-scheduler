// Display a single team's current roster
export default function TeamRoster({ teamName, teamPlayers, rosterSize }) {
  return (
    <div className="border rounded-lg p-2 flex flex-col bg-gradient-to-b from-slate-400/20 border-slate-200 to-slate-400 dark:from-jof-blue-700 dark:to-jof-blue-600/80 dark:border-jof-blue-700">
      <p className="font-medium text-sm mb-1 text-slate-800 dark:text-jof-blue-light">
        {teamName}
      </p>
      <ul className="list-disc list-inside text-xs flex-1 text-slate-700 dark:text-gray-100">
        {Array.from({ length: rosterSize }).map((_, i) => (
          <li
            className="bg-slate-200/80 dark:bg-jof-blue-900 p-1 mt-3 rounded"
            key={i}
          >
            {teamPlayers[i] || "---"}
          </li>
        ))}
      </ul>
    </div>
  );
}
