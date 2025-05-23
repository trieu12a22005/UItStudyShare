// import React from 'react';
// import { useSelector } from "react-redux";

// const DocumentContent = () => {
//   const document = useSelector((state) => state.document.currentDocument);

//   if (!document) return <p className="text-center py-10">Đang tải nội dung tài liệu...</p>;

//   return (
//     <>
//       {/* Tabs */}
//       <div className="bg-white rounded-t-xl shadow-sm">
//         <div className="flex border-b">
//           <button className="tab-button active px-6 py-3 text-gray-700">Nội dung</button>
//           <button className="tab-button px-6 py-3 text-gray-700">
//             <a href="#document_info">Thông tin</a>
//           </button>
//         </div>
//       </div>

//       {/* Document Viewer */}
//       <div className="bg-white document-viewer rounded-b-xl p-4">
//         <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
//           <div className="text-center">
//             <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center text-gray-500 mb-4">
//               <i className="fas fa-file-pdf text-3xl" />
//             </div>
//             <h3 className="text-lg font-medium text-gray-700 mb-2">Xem trước PDF</h3>
//             <p className="text-gray-500 mb-4">Bạn có thể xem hoặc tải xuống tài liệu</p>
//             <a
//               href={document.fileUrl}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium inline-block"
//             >
//               <i className="fas fa-download mr-2" /> Xem / Tải xuống
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Description */}
//       <div className="bg-white rounded-xl shadow-sm p-6 mt-6" id='document_info'>
//         <h2 className="text-xl font-semibold text-gray-800 mb-4">Mô tả tài liệu</h2>
//         <div className="prose max-w-none text-gray-700">
//           <p>{document.description || "Không có mô tả."}</p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DocumentContent;
import React from "react";

const PdfPreviewGoogle = ({ url }) => {
  if (!url) return <p>Không có file PDF để hiển thị.</p>;

  const encodedUrl = encodeURIComponent(url);
  const viewerUrl = `https://docs.google.com/gview?url=${encodedUrl}&embedded=true`;

  return (
    <iframe
      src={viewerUrl}
      style={{ width: "100%", height: "600px", border: "none" }}
      title="Xem trước tài liệu PDF"
      allowFullScreen
    />
  );
};

const DocumentContent = ({ document }) => {
  if (!document) return <p>Đang tải nội dung tài liệu...</p>;

  return (
    <>
      {/* Tabs */}
      <div className="bg-white rounded-t-xl shadow-sm">
        <div className="flex border-b">
          <button className="tab-button active px-6 py-3 text-gray-700">
            Nội dung
          </button>
          <button className="tab-button px-6 py-3 text-gray-700">
            <a href="#document_info">Thông tin</a>
          </button>
        </div>
      </div>

      {/* PDF Preview */}
      <div className="bg-white document-viewer rounded-b-xl p-4">
        <PdfPreviewGoogle url={document.fileUrl} />
      </div>

      {/* Description */}
      <div
        className="bg-white rounded-xl shadow-sm p-6 mt-6"
        id="document_info"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Mô tả tài liệu
        </h2>
        <div className="prose max-w-none text-gray-700">
          <p>{document.description || "Không có mô tả."}</p>
        </div>
      </div>
    </>
  );
};

export default DocumentContent;
