import React from 'react';

const DocumentActions = () => (
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
);

export default DocumentActions;
