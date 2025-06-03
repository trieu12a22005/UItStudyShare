import React, { useEffect, useState } from "react";
import { getAllCategories, postPost } from "../Service/PostService";
import { toast } from "react-toastify";

function PostModal({ isOpen, onClose }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
useEffect(() => {
  const handleClickOutside = (e) => {
    if (!e.target.closest(".dropdown-categories")) {
      setShowDropdown(false);
    }
  };
  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);

  useEffect(() => {
    if (!isOpen) return;

    getAllCategories()
      .then((data) => {
        const sorted = (data || []).sort((a, b) =>
          a.description.localeCompare(b.description)
        );
        setCategories(sorted);
      })
      .catch((err) => {
        console.error("Lấy categories lỗi:", err);
      });

    // Reset khi mở modal
    setSelectedCategories([]);
    setSelectedFiles([]);
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleCategory = (catId) => {
    setSelectedCategories((prev) =>
      prev.includes(catId)
        ? prev.filter((id) => id !== catId)
        : [...prev, catId]
    );
  };

  return (
    <div
      className="fixed inset-0 bg-white bg-opacity-20 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl w-full max-w-2xl slide-in shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#3188F2] text-white rounded-t-xl p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Tạo bài viết mới</h3>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200"
              type="button"
              aria-label="Close modal"
            >
              <i className="fas fa-times text-xl" />
            </button>
          </div>
          <p className="text-sm opacity-90 mt-1">
            Chia sẻ kiến thức với cộng đồng học tập
          </p>
        </div>

        <div className="p-6">
          <form
            className="space-y-6"
            onSubmit={async (e) => {
              e.preventDefault();
              const form = e.target;
              const formData = new FormData();

              formData.append("title", form.title.value);
              formData.append("content", form.content.value);

              // Thêm các category
              selectedCategories.forEach((catId) => {
                formData.append("category", catId);
              });

              // Thêm file
              for (let i = 0; i < selectedFiles.length; i++) {
                formData.append("mediaFiles", selectedFiles[i]);
              }

              try {
                await postPost(formData);
                toast.success("Bài viết đã được đăng!");
                onClose();
              } catch (error) {
                console.error("Lỗi khi tạo bài viết:", error);
                toast.error("Đăng bài thất bại. Vui lòng thử lại.");
              }
            }}
          >
            {/* Tiêu đề */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Tiêu đề bài viết
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary transition"
                placeholder="Hãy viết một tiêu đề hấp dẫn..."
                required
              />
            </div>

            {/* Nội dung */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Nội dung
              </label>
              <textarea
                id="content"
                name="content"
                rows={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary transition mb-4"
                placeholder="Chia sẻ kiến thức, câu hỏi hay kinh nghiệm học tập của bạn..."
                required
              ></textarea>
            </div>

            {/* Upload File */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-4">
              <div className="text-center">
                <label htmlFor="media-upload" className="cursor-pointer">
                  <i className="fas fa-cloud-upload-alt text-3xl text-primary mb-2" />
                  <p className="text-sm text-gray-600">
                    Kéo thả hình ảnh/video vào đây hoặc nhấn để chọn
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Hỗ trợ JPG, PNG, MP4 (tối đa 10MB)
                  </p>
                </label>
                <input
                  id="media-upload"
                  type="file"
                  name="mediaFiles"
                  className="hidden"
                  multiple
                  accept="image/*,video/*"
                  onChange={(e) => setSelectedFiles(Array.from(e.target.files))}
                />
              </div>

              {/* Hiển thị tên file đã chọn */}
              {selectedFiles.length > 0 && (
                <div className="mt-4 text-left text-sm text-gray-700">
                  <strong>Đã chọn:</strong>
                  <ul className="list-disc list-inside mt-1">
                    {selectedFiles.map((file, idx) => (
                      <li key={idx}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Dropdown chọn chủ đề với checkbox */}
<div className="relative">
  <label className="block text-sm font-medium text-gray-700 mb-2">Chủ đề</label>

  <button
    type="button"
    onClick={() => setShowDropdown(!showDropdown)}
    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-left focus:ring-2 focus:ring-primary transition"
  >
    {selectedCategories.length === 0
      ? "Chọn chủ đề"
      : `Đã chọn ${selectedCategories.length} chủ đề`}
  </button>

  {showDropdown && (
    <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
      {categories.map((cat) => (
        <label key={cat._id} className="flex items-center px-4 py-2 hover:bg-gray-100">
          <input
            type="checkbox"
            value={cat._id}
            checked={selectedCategories.includes(cat._id)}
            onChange={() => toggleCategory(cat._id)}
            className="mr-2"
          />
          {cat.description}
        </label>
      ))}
    </div>
  )}
</div>


            {/* Nút hành động */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
                onClick={onClose}
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-[#3188F2] text-white rounded-lg flex items-center space-x-2 hover:shadow-lg"
              >
                <i className="fas fa-paper-plane" />
                <span>Đăng bài</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PostModal;
