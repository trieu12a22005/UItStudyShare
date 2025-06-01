export default function Pagination() {
  return (
    <div className="mt-8 flex justify-center">
      <nav className="inline-flex rounded-md shadow">
        <a href="#" className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
          <i className="fas fa-chevron-left"></i>
        </a>
        {[1, 2, 3, 4, 5].map(n => (
          <a key={n} href="#" className={`px-4 py-2 border-t border-b border-gray-300 bg-white ${n === 1 ? 'text-indigo-600 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}>
            {n}
          </a>
        ))}
        <a href="#" className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50">
          <i className="fas fa-chevron-right"></i>
        </a>
      </nav>
    </div>
  );
}
