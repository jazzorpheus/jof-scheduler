// Local Components
import CreateEventForm from "../components/CreateEventForm";
import PageFooter from "../components/PageFooter";

export default function CreateEventPage() {
  return (
    <div className="min-h-screen dark:bg-jof-blue-dark py-5">
      <CreateEventForm />
      {/* FOOTER */}
      <PageFooter />
    </div>
  );
}
