export default function DocumentFilters() {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative w-full sm:w-64">
          <input type="text" placeholder="Search documents..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
          <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
        </div>
        <div className="flex space-x-2">
          <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>All Categories</option>
            <option>Mathematics</option>
            <option>Computer Science</option>
            <option>Physics</option>
          </select>
          <select className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option>Sort by: Newest</option>
            <option>Sort by: Popular</option>
            <option>Sort by: Rating</option>
          </select>
        </div>
      </div>
    </div>
  );
}
