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
      <span className="text-md font-medium dark:text-sky-300">
        Number of Teams:
      </span>
      <div className="flex items-stretch border border-jof-blue-light rounded">
        <input
          type="text"
          value={tempValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={(e) => e.target.select()}
          className="w-10 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-jof-blue-700"
        />
        <div className="flex flex-col border-l border-jof-blue-light">
          <button
            type="button"
            onClick={increment}
            className="flex-1 w-6 border-b border-jof-blue-light text-gray-700 dark:text-gray-300 px-1 text-sm select-none hover:bg-blue-100"
          >
            +
          </button>
          <button
            type="button"
            onClick={decrement}
            className="flex-1 w-6 text-gray-700 dark:text-gray-300 px-1 text-sm select-none hover:bg-blue-100"
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
      <span className="text-md font-medium dark:text-sky-300">
        Players per Team:
      </span>
      <div className="flex items-stretch border border-jof-blue-light rounded">
        <input
          type="text"
          value={tempValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={(e) => e.target.select()}
          className="w-10 px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-jof-blue-700"
        />
        <div className="flex flex-col border-l border-jof-blue-light">
          <button
            type="button"
            onClick={increment}
            className="flex-1 w-6 border-b border-jof-blue-light text-gray-700 dark:text-gray-300 px-1 text-sm select-none hover:bg-blue-100"
          >
            +
          </button>
          <button
            type="button"
            onClick={decrement}
            className="flex-1 w-6 text-gray-700 dark:text-gray-300 px-1 text-sm select-none hover:bg-blue-100"
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
      <div className="relative border border-jof-blue-light rounded-lg p-4 shadow-sm bg-white dark:bg-jof-blue-700 w-full mx-auto mt-3 ">
        {/* Heading */}
        <div className="rounded-full absolute -top-3 left-1/2 transform -translate-x-1/2 flex items-center text-gray-600 dark:text-white dark:bg-jof-blue-light">
          <div className="border-t border-jof-blue-light flex-grow mr-3 -mt-1"></div>
          <h2 className="text-xl font-bold text-center leading-none relative -top-0.7 bg-white dark:bg-jof-blue-700 px-4 rounded-xl">
            Team Builder
          </h2>
          <div className="border-t border-jof-blue-light flex-grow ml-3 -mt-1"></div>
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
