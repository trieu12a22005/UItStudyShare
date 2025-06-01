    export default function Tabs({ activeTab, setActiveTab }) {
    return (
        <div className="bg-white rounded-lg shadow mb-6 border-b border-gray-200">
        <nav className="flex -mb-px">
            <button
  className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition 
    ${activeTab === 'docs' 
      ? 'border-blue-600 text-blue-600' 
      : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-300'}
  `}
  onClick={() => setActiveTab('docs')}
>
  <i className="fas fa-file-alt mr-2"></i> My Documents
</button>

<button
  className={`py-4 px-6 text-center border-b-2 font-medium text-sm transition 
    ${activeTab === 'posts' 
      ? 'border-blue-600 text-blue-600' 
      : 'border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-300'}
  `}
  onClick={() => setActiveTab('posts')}
>
  <i className="fas fa-comments mr-2"></i> Posts
</button>

        </nav>
        </div>
    );
    }
