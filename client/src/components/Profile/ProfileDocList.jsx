import { useEffect, useState } from "react";
import { findDocument, getDocument } from "../../components/Service/DocumentService";
import { useAuth } from "../../hooks/AuthContext";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import DocumentCard from "./DocumentCard";
import { getPosts } from "../Service/PostService";
import PostCard from "./PostCard";

function ProfileDocList() {
  const { isLogin, user } = useAuth();
  const [document, setDocument] = useState({ documents: [], total: 1 });
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState("docs");
  const [posts, setPosts] = useState([]);
  const [currentPostPage, setCurrentPostPage] = useState(1);
  const POSTS_PER_PAGE = 2;

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

        const filteredDocs = result.documents.filter(doc => doc.uploadedBy === user.idUser);
        setDocument({ documents: filteredDocs, pages: result.pages });
      } catch (err) {
        console.error("Lỗi tải tài liệu:", err);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab === "docs") {
      fetchApi();
    }
  }, [isLogin, currentPage, searchTerm, activeTab, user.idUser]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (activeTab !== "posts" || !isLogin) return;
      setLoading(true);
      try {
        const res = await getPosts();
        const userPosts = (res.posts || []).filter((p) => p.author === user.idUser);
        setPosts(userPosts);
      } catch (err) {
        console.error("Lỗi tải bài viết:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [activeTab, isLogin, user.idUser]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    setCurrentPostPage(1);
  }, [activeTab]);

  const totalPages = document.pages || 1;
const totalPostPages = posts.length > 0 ? Math.ceil(posts.length / POSTS_PER_PAGE) : 1;


  if (!isLogin) {
    return (
      <div className="text-center py-20 text-xl text-red-600 font-semibold">
        Bạn chưa đăng nhập!!{" "}
        <Link to="/login" className="text-blue-500 underline hover:text-blue-700">
          Đăng nhập ngay
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-4">
        <div className="bg-white rounded-lg shadow border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              className={`py-3 px-6 text-sm font-medium border-b-2 transition ${
                activeTab === "docs"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-300"
              }`}
              onClick={() => setActiveTab("docs")}
            >
              <i className="fas fa-file-alt mr-2" />
              My Documents
            </button>
            <button
              className={`py-3 px-6 text-sm font-medium border-b-2 transition ${
                activeTab === "posts"
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-blue-600 hover:border-blue-300"
              }`}
              onClick={() => setActiveTab("posts")}
            >
              <i className="fas fa-comments mr-2" />
              Posts
            </button>
          </nav>
        </div>
      </div>

      <div className="flex flex-col min-h-screen px-4 lg:px-16 py-6">
        {activeTab === "docs" && (
          <>
            {loading ? (
              <div className="text-center py-20 text-lg text-gray-600">Đang tải dữ liệu...</div>
            ) : (
              <div
                className="grid gap-6"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}
              >
                {document.documents.map((doc) => (
                  <DocumentCard key={doc._id} item={doc} />
                ))}
              </div>
            )}

            <div className="pagination-container flex justify-center py-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </>
        )}

       {activeTab === "posts" && (
  <>
    {loading ? (
      <div className="text-center py-20 text-lg text-gray-600">Đang tải bài viết...</div>
    ) : posts.length === 0 ? (
      <div className="text-center py-20 text-gray-500 italic">
        Bạn chưa có bài viết nào.
      </div>
    ) : (
      <>
        <div className="space-y-6">
          {posts
            .slice((currentPostPage - 1) * POSTS_PER_PAGE, currentPostPage * POSTS_PER_PAGE)
            .map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
        </div>

        {/* Đây là pagination đúng của bài viết */}
        <div className="pagination-container flex justify-center py-4">
          <Pagination
            currentPage={currentPostPage}
            totalPages={totalPostPages}
            onPageChange={setCurrentPostPage}
          />
        </div>
      </>
    )}
  </>
)}
      </div>
    </> 
  );
}

export default ProfileDocList;
