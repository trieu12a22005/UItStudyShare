import { useEffect, useState } from "react";
import { findDocument, getDocument } from "../../components/Service/DocumentService";
import "./Document.scss";
import Footer from "../../components/Footer/Footer";
import AIAssistantModal from "../../components/AI/Assistance";
import { MessageSquare } from "lucide-react";
import Pagination from "../../components/Pagination/Pagination";
import FilterBar from "../../components/FilterBar/FilterBar";
import DocumentList from "../../components/DocumentList/DocumentList";

function Document() {
  const [document, setDocument] = useState({ documents: [], total: 1 });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState({ id: '', name: 'All Categories' });
  const [open, setOpen] = useState(false);
  const [chatData, setChatdata] = useState(null);
  const [categories, setCategories] = useState([{ id: '', name: 'All Categories' }]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3055/api/v1/categories', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) throw new Error('Lỗi lấy danh mục');
        const data = await response.json();
        setCategories([{ id: '', name: 'All Categories' }, ...data.map(d => ({ id: d._id, name: d.name }))]);
      } catch (err) {
        console.error('Lỗi khi tải danh mục:', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        let result;
        if (selectedCategory && selectedCategory.id) {
          const response = await fetch(`http://localhost:3055/api/v1/documents/byCategory/${selectedCategory.id}`, {
            method: 'GET',
            credentials: 'include'
          });
          result = await response.json();
        } else if (searchTerm !== "") {
          result = await findDocument(searchTerm, currentPage);
        } else {
          result = await getDocument(currentPage);
        }
        setDocument(result);
      } catch (err) {
        console.error("Lỗi tải tài liệu:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDocuments();
  }, [currentPage, searchTerm, selectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const totalPages = document.pages || 1;

  return (
    <>
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterChange={setFilterType}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <div className="flex flex-col min-h-screen">
        <div className="document__list flex-grow">
          {loading ? (
            <div className="text-center py-20 text-lg text-gray-600">Đang tải dữ liệu...</div>
          ) : (
            <DocumentList documents={document.documents} />
          )}
        </div>
        <div className="pagination-container flex justify-center py-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      <button
        className="fixed bottom-30 right-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition duration-300 flex items-center space-x-2"
        onClick={() => setOpen(!open)}
      >
        <MessageSquare className="w-6 h-6" />
        <span className="text-sm">Chat cùng AI</span>
      </button>
      <AIAssistantModal chatData={chatData} open={open} setOpen={setOpen} />
    </>
  );
}

export default Document;
