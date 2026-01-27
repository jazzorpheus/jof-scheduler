// Context
import { TeamsProvider, useTeams } from "../context/TeamsContext";
import React from "react";

// Local Components
import EditableTeamRostersGrid from "./EditableTeamRostersGrid";

function NumTeamsInput() {
  const { numTeams, setNumTeams } = useTeams();
  const [tempValue, setTempValue] = React.useState(String(numTeams));

  const handleChange = (e) => {
    setTempValue(e.target.value);
  };

  const handleBlur = () => {
    let val = parseInt(tempValue, 10);
    if (isNaN(val)) val = 10;
    else if (val < 2) val = 2;
    else if (val > 15) val = 15;
    setNumTeams(val);
    setTempValue(String(val));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };

  const increment = () => {
    let val = parseInt(tempValue, 10);
    if (isNaN(val)) val = 10;
    val = Math.min(val + 1, 15);
    setNumTeams(val);
    setTempValue(String(val));
  };

  const decrement = () => {
    let val = parseInt(tempValue, 10);
    if (isNaN(val)) val = 10;
    val = Math.max(val - 1, 2);
    setNumTeams(val);
    setTempValue(String(val));
  };

  return (
    <label className="flex items-center space-x-2">
      <span className="text-md font-medium dark:text-jof-blue-light">
        Number of Teams:
      </span>
      <div className="flex items-stretch border border-slate-400 dark:border-jof-blue-light rounded-lg overflow-hidden">
        <input
          type="text"
          value={tempValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onFocus={(e) => e.target.select()}
          className="w-10 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-slate-200 dark:bg-jof-blue-900 dark:hover:bg-jof-blue-700"
        />
        <div className="flex flex-col border-l border-slate-400 dark:border-jof-blue-light">
          <button
            type="button"
            onClick={increment}
            className="flex-1 w-6 border-b border-slate-400 dark:border-jof-blue-light text-gray-700 dark:text-gray-300 px-1 text-sm select-none hover:bg-slate-200 dark:hover:bg-jof-blue-500"
          >
            +
          </button>
          <button
            type="button"
            onClick={decrement}
            className="flex-1 w-6 text-gray-700 dark:text-gray-300 px-1 text-sm select-none hover:bg-slate-200 dark:hover:bg-jof-blue-500"
          >
            –
          </button>
        </div>
      </div>
    </label>
  );
}

function RosterSizeInput() {
  const { rosterSize, setRosterSize } = useTeams();
  const [tempValue, setTempValue] = React.useState(String(rosterSize));

  const handleChange = (e) => {
    setTempValue(e.target.value);
  };

  const handleBlur = () => {
    let val = parseInt(tempValue, 10);
    if (isNaN(val)) val = 10;
    else if (val < 2) val = 2;
    else if (val > 15) val = 15;
    setRosterSize(val);
    setTempValue(String(val));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.blur();
    }
  };

  const increment = () => {
    let val = parseInt(tempValue, 10);
    if (isNaN(val)) val = 10;
    val = Math.min(val + 1, 15);
    setRosterSize(val);
    setTempValue(String(val));
  };

  const decrement = () => {
    let val = parseInt(tempValue, 10);
    if (isNaN(val)) val = 10;
    val = Math.max(val - 1, 2);
    setRosterSize(val);
    setTempValue(String(val));
  };

  return (
    <label className="flex items-center space-x-2">
      <span className="text-md font-medium dark:text-jof-blue-light">
        Players per Team:
      </span>
      <div className="flex items-stretch border border-slate-400 dark:border-jof-blue-light rounded-lg overflow-hidden">
        <input
          type="text"
          value={tempValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          onFocus={(e) => e.target.select()}
          className="w-10 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-slate-200 dark:bg-jof-blue-900 dark:hover:bg-jof-blue-700"
        />
        <div className="flex flex-col border-l border-slate-400 dark:border-jof-blue-light">
          <button
            type="button"
            onClick={increment}
            className="flex-1 w-6 border-b border-slate-400 dark:border-jof-blue-light text-gray-700 dark:text-gray-300 px-1 text-sm select-none hover:bg-slate-200 dark:hover:bg-jof-blue-500"
          >
            +
          </button>
          <button
            type="button"
            onClick={decrement}
            className="flex-1 w-6 text-gray-700 dark:text-gray-300 px-1 text-sm select-none hover:bg-slate-200 dark:hover:bg-jof-blue-500"
          >
            –
          </button>
        </div>
      </div>
    </label>
  );
}

export default function TeamBuilder() {
  return (
    <TeamsProvider>
      <div className="relative rounded-lg p-4 text-slate-700 bg-slate-300 dark:text-white dark:bg-jof-blue-900 w-full mx-auto mt-3 ">
        {/* Heading */}
        <div className="rounded-full p-2 min-w-56 absolute -top-3 left-1/2 transform -translate-x-1/2 flex items-center dark:bg-jof-blue-900">
          <div className=" flex-grow mr-3 -mt-1"></div>
          <h2 className="text-xl font-bold text-center leading-none relative -top-0.7 bg-slate-300 dark:bg-jof-blue-900 px-4 rounded-xl">
            Team Builder
          </h2>
          <div className=" flex-grow ml-3 -mt-1"></div>
        </div>

        {/* Controls row */}
        <div className="flex flex-wrap md:flex-nowrap justify-center items-center gap-4 mt-8 w-full">
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
