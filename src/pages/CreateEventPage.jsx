// Local Components
import CreateEventForm from "../components/CreateEventForm";
import PageFooter from "../components/PageFooter";

export default function CreateEventPage() {
  return (
    <div className="min-h-screen bg-slate-300 dark:bg-jof-blue-900 py-5">
      {/* MAIN CONTENT */}
      <CreateEventForm />
      {/* FOOTER */}
      <PageFooter />
    </div>
  );
}
