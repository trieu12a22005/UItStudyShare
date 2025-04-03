import React from 'react';

const DocumentContent = () => (
  <>
   {/* Tabs */}
   <div className="bg-white rounded-t-xl shadow-sm">
            <div className="flex border-b">
              <button className="tab-button active px-6 py-3 text-gray-700">Nội dung</button>
              <button className="tab-button px-6 py-3 text-gray-700">
                <a href="#document_info">Thông tin</a>
              </button>
            </div>
          </div>
          {/* Document Viewer */}
          <div className="bg-white document-viewer rounded-b-xl p-4">
            <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mb-4">
                  <i className="fas fa-file-pdf text-3xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Xem trước PDF</h3>
                <p className="text-gray-500 mb-4">Trình xem PDF sẽ được hiển thị tại đây</p>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
                  <i className="fas fa-download mr-2" /> Tải xuống để xem đầy đủ
                </button>
              </div>
            </div>
          </div>
          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm p-6 mt-6" id='document_info'>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Mô tả tài liệu</h2>
            <div className="prose max-w-none text-gray-700">
              <p>Tài liệu này bao gồm toàn bộ nội dung bài giảng chương 1 môn Toán cao cấp, phục vụ cho
                sinh viên năm nhất các trường đại học kỹ thuật.</p>
              <p className="mt-2"><strong>Nội dung chính:</strong></p>
              <ul className="list-disc pl-5 mt-2">
                <li>Giới hạn và liên tục của hàm số</li>
                <li>Đạo hàm và vi phân</li>
                <li>Ứng dụng của đạo hàm</li>
                <li>Tích phân bất định và tích phân xác định</li>
                <li>Ứng dụng của tích phân</li>
              </ul>
              <p className="mt-2"><strong>Tài liệu tham khảo:</strong></p>
              <ul className="list-disc pl-5 mt-2">
                <li>Giáo trình Toán cao cấp - ĐH Bách Khoa Hà Nội</li>
                <li>Calculus Early Transcendentals - James Stewart</li>
              </ul>
            </div>
          </div>
  </>
);

export default DocumentContent;
