// React Hook Form
import { useForm } from "react-hook-form";

export default function CreateEventForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("New event:", data);
    // later: send to backend, update state, etc.
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto p-4 border rounded-lg space-y-4"
    >
      <div>
        <label className="block mb-1 font-medium">Event Title</label>
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
          className="w-full border rounded px-2 py-1"
        />
        {errors.title && (
          <p className="text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-1 font-medium">Date</label>
        <input
          type="date"
          {...register("date", { required: "Date is required" })}
          className="w-full border rounded px-2 py-1"
        />
        {errors.date && (
          <p className="text-sm text-red-500">{errors.date.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Create Event
      </button>
    </form>
  );
}
