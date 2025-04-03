import React from 'react';

function Breadcrumb() {
  return (
    <>
      <div className="flex items-center text-sm text-gray-600 mb-6">
        <a href="#" className="hover:text-blue-600">Trang chủ</a>
        <span className="mx-2">/</span>
        <a href="#" className="hover:text-blue-600">Tài liệu</a>
        <span className="mx-2">/</span>
        <a href="#" className="hover:text-blue-600">Toán</a>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">Bài giảng Toán cao cấp - Chương 1</span>
      </div>

    </>
  )
}

export default Breadcrumb;
