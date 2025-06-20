import React, { useState } from "react";
import { toast } from "react-toastify";
import PostModal from "./PostModal";
import { useAuth } from "../../hooks/AuthContext"; // giả định bạn dùng AuthContext

function PostHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLogin } = useAuth() || {}; // nếu bạn có context xác thực

  const handleOpenModal = () => {
    if (!isLogin) {
      toast.error("Bạn cần đăng nhập để đăng bài.");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <section id="post-feed" className="space-y-6">
          <h2 className="text-2xl font-bold text-dark mb-4">Bài viết gần đây</h2>

          {/* Các bài viết sẽ render ở đây */}
        </section>
      </main>

      {/* Nút tròn tạo bài viết */}
      <button
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#3188F2] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-600 transition z-50"
        onClick={handleOpenModal}
      >
        <i className="fas fa-plus text-xl" />
      </button>

      {/* Modal tạo bài viết */}
      <PostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isLogin={isLogin} />
    </>
  );
}

export default PostHeader;
