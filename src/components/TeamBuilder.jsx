// Local Components
import Button from "./Button";

export default function TeamBuilder() {
  return (
    <div className="relative border rounded-lg p-4 shadow-sm bg-white w-full mx-auto mt-4">
      {/* Heading interjected into the border, centered */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex items-center text-gray-600">
        <div className="border-t border-gray-300 flex-grow mr-3 -mt-1"></div>
        <h2 className="text-xl font-bold leading-none relative -top-0.7 bg-white px-2">
          Team Builder
        </h2>
        <div className="border-t border-gray-300 flex-grow ml-3 -mt-1"></div>
      </div>

      {/* Horizontal row: Max players + number input + team input + Add Team button */}
      <div className="flex items-center space-x-2 mt-8 w-full">
        <span className="text-sm font-medium">Max Players per Team</span>
        <input
          type="number"
          min={1}
          max={15}
          className="w-20 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Team Name"
          className="flex-1 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Button confirm>Add Team</Button>
      </div>
    </div>
  );
}
