export default function PageHeader({ title, children }) {
  return (
    <header>
      <div className="mx-auto w-full max-w-5xl bg-slate-300 dark:bg-jof-blue-700 shadow-sm px-4 py-6 text-center sm:px-6 lg:px-8 rounded-b-xl">
        <h1 className="text-2xl font-bold text-slate-700 sm:text-3xl dark:text-white">
          {title}
        </h1>
        <p className="mx-auto mt-2 max-w-3xl text-sm text-slate-600 sm:text-base dark:text-gray-300">
          {children}
        </p>
      </div>
    </header>
  );
}
