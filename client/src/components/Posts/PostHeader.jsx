import React, { useState } from "react";
import PostModal from "./PostModal";

function PostHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <section id="post-feed" className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-dark">Bài viết gần đây</h2>
          <button
            id="create-post-btn"
            className="bg-[#3188F2] text-white px-6 py-2 rounded-lg flex items-center space-x-2 btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            <i className="fas fa-plus" />
            <span>Tạo bài viết</span>
          </button>
        </div>
        <PostModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </section>
    </main>
  );
}

export default PostHeader;
