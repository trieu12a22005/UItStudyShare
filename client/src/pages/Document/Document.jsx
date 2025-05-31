import { useEffect, useState } from "react";
import { findDocument, getDocument } from "../../components/Service/DocumentService";
import { useAuth } from "../../hooks/AuthContext";
import { Link } from "react-router-dom";
import "./Document.scss";
import Footer from "../../components/Footer/Footer";
import AIAssistantModal from "../../components/AI/Assistance";
import { MessageSquare } from "lucide-react";
import Pagination from "../../components/Pagination/Pagination";
import FilterBar from "../../components/FilterBar/FilterBar";
import DocumentList from "../../components/DocumentList/DocumentList";
function Document() {
  const { isLogin } = useAuth();
  const [document, setDocument] = useState({ documents: [], total: 1 });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [open, setOpen] = useState(false);
  const [chatData, setChatdata] = useState(null);
  const categories = ['All Categories', 'Math', 'Science', 'AI', 'History'];

  useEffect(() => {
    if (!isLogin) {
      setDocument({ documents: [], total: 1 });
      return;
    }

    const fetchApi = async () => {
      setLoading(true);
      try {
        let result;
        if (searchTerm === "") {
          result = await getDocument(currentPage);
        } else {
          result = await findDocument(searchTerm, currentPage);
        }
        setDocument(result);
      } catch (err) {
        console.error("Lỗi tải tài liệu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchApi();
  }, [isLogin, currentPage, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = document.pages
  console.log(document.pages)
  if (!isLogin) {
    return (
      <div className="text-center py-20 text-xl text-red-600 font-semibold">
        Bạn chưa đăng nhập!! <Link to="/login" className="text-blue-500 underline hover:text-blue-700">Đăng nhập ngay</Link>
      </div>
    );
  }

  return (
    <>
      {/* Không render lại FilterBar và Pagination khi document thay đổi */}
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterChange={setFilterType}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={(cat) => setSelectedCategory(cat === 'All Categories' ? '' : cat)}
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
      <Footer />
    </>
  );
}

export default Document;
