import { useForm } from "react-hook-form";
import { useRef } from "react";
import TeamBuilder from "./TeamBuilder";
import Button from "./Button";

// Small internal component for auto-expanding textarea
function AutoResizeTextarea({ register, name, id, ...props }) {
  const ref = useRef();

  const handleInput = () => {
    const el = ref.current;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  return (
    <textarea
      {...register(name)}
      {...props}
      id={id}
      ref={ref}
      onInput={handleInput}
      rows={3}
      className="peer w-full border dark:border-jof-blue-900 rounded px-2 pt-5 pb-2 
                 bg-transparent bg-slate-100 dark:bg-jof-blue-900 dark:hover:border-white
                 dark:focus:border-jof-blue-light text-gray-100 overflow-hidden 
                 focus:outline-none focus:border-jof-blue-light transition-[height] duration-150 ease-in-out"
    />
  );
}

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
    <div className="dark:border dark:border-jof-blue-500 max-w-4xl mx-auto p-4 rounded-2xl dark:bg-jof-blue-700 text-gray-600 dark:text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Event</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Event metadata */}
        <div className="space-y-2 mb-[30px]">
          <div className="relative">
            <input
              {...register("title")}
              id="title"
              placeholder=" "
              className="peer w-full border dark:border-jof-blue-900 hover:border dark:hover:border-white dark:focus:border-jof-blue-light 
              rounded px-2 pt-5 pb-2 bg-transparent bg-slate-100 dark:bg-jof-blue-900 text-gray-100 
              focus:outline-none focus:border-jof-blue-light"
            />
            <label
              htmlFor="title"
              className="absolute left-2 top-2 text-gray-400 transition-all duration-200 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base
              peer-focus:top-1 peer-focus:text-sm peer-focus:text-jof-blue-light
              peer-[&:not(:placeholder-shown)]:top-1 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-jof-blue-light"
            >
              Title
            </label>
          </div>

          <div className="relative">
            <AutoResizeTextarea
              register={register}
              name="description"
              id="description"
              placeholder=" "
            />
            <label
              htmlFor="description"
              className="absolute left-2 top-2 text-gray-400 transition-all duration-200 
              peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:text-base
              peer-focus:top-1 peer-focus:text-sm peer-focus:text-jof-blue-light
              peer-[&:not(:placeholder-shown)]:top-1 peer-[&:not(:placeholder-shown)]:text-sm peer-[&:not(:placeholder-shown)]:text-jof-blue-light"
            >
              Description
            </label>
          </div>

          {/* *************************************************************************************************************************** */}

          {/* *************************************************************************************************************************** */}

          <div className="relative">
            <input
              type="date"
              {...register("startDate")}
              id="startDate"
              className="w-full border dark:border-jof-blue-900 dark:hover:border-white dark:focus:border-jof-blue-light 
    rounded px-2 pt-5 pb-2 bg-transparent dark:bg-jof-blue-900 text-gray-100 
    focus:outline-none focus:border-jof-blue-light appearance-none"
            />
            <label
              htmlFor="startDate"
              className="absolute left-2 top-1 text-sm text-jof-blue-light"
            >
              Start Date
            </label>
            <span className="absolute right-3 top-[58%] -translate-y-1/2 text-gray-400 pointer-events-none">
              📅
            </span>
          </div>

          <div className="relative">
            <input
              type="date"
              {...register("endDate")}
              id="endDate"
              className="w-full border dark:border-jof-blue-900 dark:hover:border-white dark:focus:border-jof-blue-light 
    rounded px-2 pt-5 pb-2 bg-transparent dark:bg-jof-blue-900 text-gray-100 
    focus:outline-none focus:border-jof-blue-light appearance-none"
            />
            <label
              htmlFor="endDate"
              className="absolute left-2 top-1 text-sm text-jof-blue-light"
            >
              End Date
            </label>
            <span className="absolute right-3 top-[58%] -translate-y-1/2 text-gray-400 pointer-events-none">
              📅
            </span>
          </div>

          {/* *************************************************************************************************************************** */}

          {/* *************************************************************************************************************************** */}
        </div>

        {/* TeamBuilder placeholder */}
        <TeamBuilder />

        <div className="flex justify-center mt-4">
          <Button confirm className="px-16 py-2">
            Create Event
          </Button>
        </div>
      </form>
    </div>
  );
}
