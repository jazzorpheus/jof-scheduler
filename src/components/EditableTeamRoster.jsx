// Third-Party Packages
import { useState, useRef, useEffect } from "react";

// Local Components
import Button from "./Button";
import { useTeams } from "../context/TeamsContext";

export default function EditableTeamRoster({
  teamName,
  teamPlayers,
  rosterSize,
  onAddPlayer,
  onRemovePlayer,
}) {
  const { renameTeam } = useTeams(); // <-- context hook
  const [newPlayer, setNewPlayer] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);
  const [editableName, setEditableName] = useState(teamName);

  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditingName && inputRef.current) {
      inputRef.current.select(); // highlights the whole text
    }
  }, [isEditingName]);

  const isFull = teamPlayers.length >= rosterSize;

  const handleAdd = () => {
    if (!isFull && newPlayer.trim()) {
      onAddPlayer(teamName, newPlayer.trim());
      setNewPlayer("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleRemove = (index) => {
    onRemovePlayer(teamName, index);
  };

  // Editable team name handlers
  const handleNameClick = () => setIsEditingName(true);
  const handleNameChange = (e) => setEditableName(e.target.value);
  const handleNameBlur = () => {
    if (editableName.trim() && editableName !== teamName) {
      renameTeam(teamName, editableName.trim()); // <-- update via context
    }
    setIsEditingName(false);
  };
  const handleNameKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleNameBlur();
    }
  };

  return (
    <div className="border rounded-lg p-2 bg-gray-50 flex flex-col space-y-2">
      {/* Editable team name */}
      <div className="flex items-center justify-between">
        {isEditingName ? (
          <input
            ref={inputRef}
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
            {/* Pencil/edit icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-400 hover:text-gray-600 cursor-pointer"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              onClick={handleNameClick} // optional: also triggers edit
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

      {/* Team roster */}
      <ul className="list-disc list-inside text-xs flex-1 space-y-1">
        {Array.from({ length: rosterSize }).map((_, i) => (
          <li key={i}>{teamPlayers[i] || "---"}</li>
        ))}
      </ul>

      {/* Player input & add button */}
      <div className="flex flex-col space-y-1">
        <input
          type="text"
          value={newPlayer}
          onChange={(e) => setNewPlayer(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isFull}
          placeholder="Add player"
          className="w-full border rounded px-2 py-1 text-xs"
        />

        <Button
          confirm
          disabled={isFull}
          onClick={handleAdd}
          className="py-1 w-full text-xs"
        >
          Add
        </Button>
      </div>

      {/* Remove buttons */}
      <ul className="list-none flex flex-wrap gap-1 mt-1 text-xs">
        {teamPlayers.map((player, i) => (
          <li
            key={i}
            className="flex items-center space-x-1 bg-gray-100 px-1 rounded"
          >
            <span>{player}</span>
            <button
              type="button"
              onClick={() => handleRemove(i)}
              className="text-red-500 font-bold"
              aria-label={`Remove ${player}`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
