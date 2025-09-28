import { useState, useRef, useEffect } from "react";
import { useTeams } from "../context/TeamsContext";

export default function EditableTeamRoster({
  gridPosition, // stable identifier
  teamName,
  teamPlayers,
  rosterSize,
  onAddPlayer,
  onRemovePlayer,
}) {
  const { renameTeam } = useTeams();
  const [isEditingName, setIsEditingName] = useState(false);
  const [editableName, setEditableName] = useState(teamName);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  const nameInputRef = useRef(null);
  const playerInputRef = useRef(null);

  // Sync editableName with teamName prop
  useEffect(() => {
    setEditableName(teamName);
  }, [teamName]);

  // Autofocus and select input
  useEffect(() => {
    if (isEditingName && nameInputRef.current) nameInputRef.current.select();
  }, [isEditingName]);

  useEffect(() => {
    if (editingIndex !== null && playerInputRef.current)
      playerInputRef.current.select();
  }, [editingIndex]);

  // Team name handlers
  const handleNameClick = () => setIsEditingName(true);
  const handleNameChange = (e) => setEditableName(e.target.value);
  const handleNameBlur = () => {
    if (editableName.trim() && editableName !== teamName) {
      renameTeam(gridPosition, editableName.trim());
    }
    setIsEditingName(false);
  };
  const handleNameKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNameBlur();
    }
  };

  // Player handlers
  const startEditPlayer = (i, initialValue) => {
    setEditingIndex(i);
    setEditingValue(initialValue || "");
  };

  const commitPlayerEditOnEnter = () => {
    if (editingIndex === null) return;
    const val = editingValue.trim();
    if (val) {
      onAddPlayer(gridPosition, val, editingIndex);
    }

    const nextIndex = editingIndex + 1;
    setEditingIndex(null);
    setEditingValue("");
    if (nextIndex < rosterSize) {
      startEditPlayer(nextIndex, teamPlayers[nextIndex] || "");
    }
  };

  const commitPlayerEditOnBlur = () => {
    if (editingIndex === null) return;
    const val = editingValue.trim();
    if (val) {
      onAddPlayer(gridPosition, val, editingIndex);
    }
    setEditingIndex(null);
    setEditingValue("");
  };

  const handleRemove = (i) => {
    onRemovePlayer(gridPosition, i);
  };

  return (
    <div className="border rounded-lg p-2 bg-gray-50 flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        {isEditingName ? (
          <input
            ref={nameInputRef}
            type="text"
            value={editableName}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            onKeyDown={handleNameKeyPress}
            autoFocus
            className="border-b border-gray-400 px-1 text-sm font-medium w-full"
          />
        ) : (
          <>
            <span
              className="text-sm font-medium cursor-pointer hover:text-blue-500"
              onClick={handleNameClick}
            >
              {teamName}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={handleNameClick}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"
              />
            </svg>
          </>
        )}
      </div>

      <ul className="list-none text-sm flex-1 space-y-1">
        {Array.from({ length: rosterSize }).map((_, i) => {
          const player = teamPlayers[i];

          if (editingIndex === i) {
            return (
              <li key={i} className="flex items-center">
                <input
                  ref={playerInputRef}
                  type="text"
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                  onBlur={commitPlayerEditOnBlur}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      commitPlayerEditOnEnter();
                    }
                  }}
                  autoFocus
                  className="flex-1 min-w-0 border-b border-gray-400 px-1 text-sm"
                />
              </li>
            );
          }

          return (
            <li
              key={i}
              className={`flex items-center justify-between px-1 py-0.5 rounded cursor-pointer ${
                !player
                  ? "border border-gray-300 hover:bg-sky-100" // empty slot
                  : "hover:bg-sky-100" // filled slot
              }`}
              onClick={() => startEditPlayer(i, player)}
            >
              <div className="flex items-center space-x-1">
                {!player && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                )}
                <span
                  className={
                    player
                      ? "text-gray-800 cursor-pointer hover:text-blue-500"
                      : "text-gray-400 italic select-none"
                  }
                >
                  {player || "Add player"}
                </span>
              </div>
              {player && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(i);
                  }}
                  className="text-red-500 font-bold hover:text-red-700 ml-2"
                  aria-label={`Remove ${player}`}
                >
                  ×
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
