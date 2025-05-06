import React from 'react';

function DocumentHeader() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
    <div className="flex flex-col md:flex-row">
      {/* Document Icon */}
      <div className="w-20 h-20 rounded-lg bg-red-100 flex items-center justify-center text-red-500 mr-6 mb-4 md:mb-0">
        <i className="fas fa-file-pdf text-4xl"></i>
      </div>

      {/* Document Info */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Bài giảng Toán cao cấp - Chương 1
        </h1>

        <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4">
          <span className="flex items-center mr-4 mb-2 md:mb-0">
            <i className="fas fa-user-graduate mr-1"></i> Nguyễn Văn A
          </span>
          <span className="flex items-center mr-4 mb-2 md:mb-0">
            <i className="fas fa-calendar-alt mr-1"></i> 15/10/2023
          </span>
          <span className="flex items-center mr-4 mb-2 md:mb-0">
            <i className="fas fa-download mr-1"></i> 124 lượt tải
          </span>
          <span className="flex items-center">
            <i className="fas fa-eye mr-1"></i> 356 lượt xem
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {['Toán', 'Bài giảng', 'Đại học', 'Giải tích'].map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex mr-2">
            <i className="fas fa-star text-yellow-400 rating-star"></i>
            <i className="fas fa-star text-yellow-400 rating-star"></i>
            <i className="fas fa-star text-yellow-400 rating-star"></i>
            <i className="fas fa-star text-yellow-400 rating-star"></i>
            <i className="fas fa-star-half-alt text-yellow-400 rating-star"></i>
          </div>
          <span className="text-sm text-gray-600">4.7/5 (28 đánh giá)</span>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 document-actions">
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center">
            <i className="fas fa-download mr-2"></i> Tải xuống
          </button>
          <button className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg font-medium border border-gray-300 flex items-center">
            <i className="fas fa-heart mr-2 text-red-500"></i> Yêu thích
          </button>
          <button className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg font-medium border border-gray-300 flex items-center">
            <i className="fas fa-share-alt mr-2 text-blue-500"></i> Chia sẻ
          </button>
          <button className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg font-medium border border-gray-300 flex items-center">
            <i className="fas fa-flag mr-2 text-orange-500"></i> Báo cáo
          </button>
        </div>
      </div>
    </div>
  </div>

  )
}

export default DocumentHeader;
