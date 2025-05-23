import React from 'react';
import { toast } from 'react-toastify';

function DocumentHeader({ document }) {
  if (!document) return null;
//   console.log("✅ Document nhận vào:", document);
// console.log("✅ Title:", document?.title);
// console.log("🔗 fileUrl:", fileUrl);


const handleFavorite = () => {
    // TODO: Gọi API thêm tài liệu vào danh sách yêu thích
    toast.success("Đã thêm vào yêu thích!");
    console.log("❤️ Yêu thích tài liệu:", document._id);
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => {
        toast.info("Đã sao chép liên kết chia sẻ!");
      })
      .catch(() => {
        toast.error("Không thể sao chép liên kết!");
      });
  };

  const handleReport = () => {
    // TODO: Gọi modal hoặc API gửi báo cáo
    toast.warning("Bạn đã báo cáo tài liệu này.");
    console.log("🚩 Báo cáo tài liệu:", document._id);
  };


  const {
    title,
    uploadedBy,
    createdAt,
    downloadCount,
    Subject,
    type,
    fileUrl,
  } = document;
  const formatDate = (dateStr) => {
    return dateStr ? new Date(dateStr).toLocaleDateString("vi-VN") : "Chưa rõ ngày";
  };
// console.log("🔗 fileUrl:", fileUrl);
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex flex-col md:flex-row">
        {/* Icon tài liệu */}
        <div className="w-20 h-20 rounded-lg bg-red-100 flex items-center justify-center text-red-500 mr-6 mb-4 md:mb-0">
          <i className={`fas ${type === 'exam' ? 'fa-file-alt' : 'fa-file-pdf'} text-4xl`} />
        </div>

        {/* Thông tin tài liệu */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {title || "Không có tiêu đề"}
          </h1>

          <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4">
            <span className="flex items-center mr-4 mb-2 md:mb-0">
              <i className="fas fa-user-graduate mr-1" /> {uploadedBy || "Không rõ"}
            </span>
            <span className="flex items-center mr-4 mb-2 md:mb-0">
              <i className="fas fa-calendar-alt mr-1" /> {formatDate(createdAt)}
            </span>
            <span className="flex items-center mr-4 mb-2 md:mb-0">
              <i className="fas fa-download mr-1" /> {downloadCount} lượt tải
            </span>
          </div>

          {/* Tags: Subject + type */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
              {Subject}
            </span>
            <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium capitalize">
              {type}
            </span>
          </div>

          {/* Hành động */}
          <div className="flex flex-wrap gap-3 document-actions">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center"
            >
              <i className="fas fa-download mr-2" /> Tải xuống
            </a>

            <button
              onClick={handleFavorite}
              className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg font-medium border border-gray-300 flex items-center"
            >
              <i className="fas fa-heart mr-2 text-red-500" /> Yêu thích
            </button>

            <button
              onClick={handleShare}
              className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg font-medium border border-gray-300 flex items-center"
            >
              <i className="fas fa-share-alt mr-2 text-blue-500" /> Chia sẻ
            </button>

            <button
              onClick={handleReport}
              className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg font-medium border border-gray-300 flex items-center"
            >
              <i className="fas fa-flag mr-2 text-orange-500" /> Báo cáo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DocumentHeader;
