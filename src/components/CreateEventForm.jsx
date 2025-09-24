import { useForm } from "react-hook-form";
import TeamBuilder from "./TeamBuilder";
import Button from "./Button";

export default function CreateEventForm() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Create Event</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Event metadata */}
        <div className="space-y-2">
          <label className="block">
            Title
            <input
              {...register("title")}
              className="border rounded px-2 py-1 w-full"
            />
          </label>
          <label className="block">
            Description
            <textarea
              {...register("description")}
              className="border rounded px-2 py-1 w-full"
            />
          </label>
          <label className="block">
            Start Date
            <input
              type="date"
              {...register("startDate")}
              className="border rounded px-2 py-1 w-full"
            />
          </label>
          <label className="block">
            End Date
            <input
              type="date"
              {...register("endDate")}
              className="border rounded px-2 py-1 w-full"
            />
          </label>
        </div>

        {/* TeamBuilder placeholder */}
        <TeamBuilder />

        <Button confirm>Save Event</Button>
      </form>
    </div>
  );
}

// // CreateEventForm.jsx
// import React from "react";
// import { useForm, useFieldArray } from "react-hook-form";
// import { v4 as uuidv4 } from "uuid";
// import TeamRoster from "./TeamRoster";

// export default function CreateEventForm() {
//   const { register, control, handleSubmit, watch } = useForm({
//     defaultValues: {
//       title: "",
//       description: "",
//       startDate: "",
//       endDate: "",
//       teams: [],
//     },
//   });

//   const {
//     fields: teams,
//     append: addTeam,
//     update: updateTeam,
//   } = useFieldArray({
//     control,
//     name: "teams",
//   });

//   const watchTeams = watch("teams");
//   const [maxPlayersPerTeam, setMaxPlayersPerTeam] = React.useState(4);

//   React.useEffect(() => {
//     teams.forEach((team, index) => {
//       const currentMembers = team.members || [];
//       const targetSize = Math.max(maxPlayersPerTeam, currentMembers.length);
//       const updatedMembers = [...currentMembers];

//       while (updatedMembers.length < targetSize) {
//         updatedMembers.push("---");
//       }

//       if (updatedMembers.length > targetSize) {
//         updatedMembers.splice(targetSize);
//       }

//       updateTeam(index, {
//         ...team,
//         members: updatedMembers,
//         maxPlayers: maxPlayersPerTeam,
//       });
//     });
//   }, [maxPlayersPerTeam]);

//   // Adjust team rosters whenever maxPlayersPerTeam changes
//   React.useEffect(() => {
//     teams.forEach((team, index) => {
//       const currentMembers = team.members?.filter((m) => m !== "---") || [];
//       let newMembers = [...currentMembers];

//       if (newMembers.length < maxPlayersPerTeam) {
//         newMembers.push(
//           ...Array(maxPlayersPerTeam - newMembers.length).fill("---")
//         );
//       } else if (newMembers.length > maxPlayersPerTeam) {
//         newMembers = newMembers.slice(0, maxPlayersPerTeam);
//       }

//       // Only update if the members array actually changes
//       if (
//         team.members?.length !== newMembers.length ||
//         team.members?.some((m, i) => m !== newMembers[i])
//       ) {
//         updateTeam(index, {
//           ...team,
//           members: newMembers,
//           maxPlayers: maxPlayersPerTeam,
//         });
//       }
//     });
//   }, [maxPlayersPerTeam]); // <-- only runs when maxPlayersPerTeam changes

//   const onSubmit = (data) => {
//     console.log("Form Data:", data);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h1 className="text-xl font-bold mb-4">Create Event</h1>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Event metadata */}
//         <div className="space-y-2">
//           <label className="block">
//             Title
//             <input
//               {...register("title")}
//               className="border rounded px-2 py-1 w-full"
//             />
//           </label>
//           <label className="block">
//             Description
//             <textarea
//               {...register("description")}
//               className="border rounded px-2 py-1 w-full"
//             />
//           </label>
//           <label className="block">
//             Start Date
//             <input
//               type="date"
//               {...register("startDate")}
//               className="border rounded px-2 py-1 w-full"
//             />
//           </label>
//           <label className="block">
//             End Date
//             <input
//               type="date"
//               {...register("endDate")}
//               className="border rounded px-2 py-1 w-full"
//             />
//           </label>
//         </div>

//         {/* Max Players per Team */}
//         <div className="space-y-2">
//           <label className="block">
//             Max Players per Team
//             <input
//               type="number"
//               value={maxPlayersPerTeam}
//               onChange={(e) => setMaxPlayersPerTeam(Number(e.target.value))}
//               min={1}
//               className="border rounded px-2 py-1 w-24"
//             />
//           </label>
//         </div>

//         {/* Add Team panel */}
//         <div className="space-y-2">
//           <h2 className="font-semibold text-lg">Add Team</h2>
//           <TeamAdder addTeam={addTeam} maxPlayers={maxPlayersPerTeam} />
//         </div>

//         {/* Roster grid */}
//         {watchTeams.length > 0 && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
//             {watchTeams.map((team, index) => (
//               <div key={team.id} className="space-y-2">
//                 <TeamRoster
//                   teamName={team.name}
//                   teamMembers={team.members || []}
//                   rosterSize={team.maxPlayers || maxPlayersPerTeam}
//                 />
//                 <AddTeamMemberInput
//                   team={team}
//                   index={index}
//                   updateTeam={updateTeam}
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
//         >
//           Save Event
//         </button>
//       </form>
//     </div>
//   );
// }

// // Component to add a new team
// function TeamAdder({ addTeam, maxPlayers }) {
//   const [teamName, setTeamName] = React.useState("");

//   const handleAdd = () => {
//     if (teamName.trim() === "") return;
//     addTeam({
//       id: uuidv4(),
//       name: teamName.trim(),
//       members: Array(maxPlayers).fill("---"), // start with blanks
//       maxPlayers: maxPlayers,
//     });
//     setTeamName("");
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleAdd();
//     }
//   };

//   return (
//     <div className="flex space-x-2">
//       <input
//         type="text"
//         value={teamName}
//         onChange={(e) => setTeamName(e.target.value)}
//         onKeyDown={handleKeyDown}
//         placeholder="Team Name"
//         className="border rounded px-2 py-1 flex-1"
//       />
//       <button
//         type="button"
//         onClick={handleAdd}
//         className="bg-green-600 text-white px-4 py-1 rounded"
//       >
//         Add Team
//       </button>
//     </div>
//   );
// }

// // Component to add a member to a specific team
// function AddTeamMemberInput({ team, index, updateTeam }) {
//   const [memberName, setMemberName] = React.useState("");

//   const handleAddMember = () => {
//     if (memberName.trim() === "") return;

//     const updatedMembers = [...(team.members || [])];

//     // Replace only the first blank "---"
//     const firstBlankIndex = updatedMembers.indexOf("---");
//     if (firstBlankIndex !== -1) {
//       updatedMembers[firstBlankIndex] = memberName.trim();
//     } else {
//       // No blanks left, just append
//       updatedMembers.push(memberName.trim());
//     }

//     updateTeam(index, { ...team, members: updatedMembers });
//     setMemberName("");
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleAddMember();
//     }
//   };

//   return (
//     <div className="flex space-x-2 mt-1">
//       <input
//         type="text"
//         value={memberName}
//         onChange={(e) => setMemberName(e.target.value)}
//         onKeyDown={handleKeyDown}
//         placeholder="New member name"
//         className="border rounded px-2 py-1 flex-1 text-sm"
//       />
//       <button
//         type="button"
//         onClick={handleAddMember}
//         className="bg-indigo-600 text-white px-3 py-1 rounded text-sm"
//       >
//         Add Member
//       </button>
//     </div>
//   );
// }
