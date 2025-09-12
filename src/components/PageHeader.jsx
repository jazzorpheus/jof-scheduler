export default function PageHeader({ title, children }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto max-w-5xl px-4 py-6 text-center sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          {title}
        </h1>
        <p className="mx-auto mt-2 max-w-3xl text-sm text-gray-600 sm:text-base">
          {children}
        </p>
      </div>
    </header>
  );
}
