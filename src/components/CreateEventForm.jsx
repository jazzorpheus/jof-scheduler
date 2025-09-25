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
    <div className="max-w-4xl mx-auto p-4 border rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Event</h1>
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

        <div className="flex justify-center mt-4">
          <Button confirm className="px-16 py-2">
            Save Event
          </Button>
        </div>
      </form>
    </div>
  );
}
