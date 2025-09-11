// Reusable page header!
export default function PageHeader({ title, children }) {
  return (
    <header className="w-full bg-white shadow-md p-6 mb-8 sticky top-0 z-50">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600 text-md">{children}</p>
      </div>
    </header>
  );
}
