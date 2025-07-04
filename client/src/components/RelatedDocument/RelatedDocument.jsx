import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getRelatedDocuments } from "../Service/DocumentService";
import { useNavigate } from "react-router-dom";

const RelatedDocument = ({ document }) => {
  const categoryIds = document?.category?.map((c) => c.categoryId).filter(Boolean) || [];
  const [relatedDocs, setRelatedDocs] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

 useEffect(() => {
  if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
    console.warn("⚠️ Không có categoryIds hợp lệ.");
    return;
  }

  const fetchDocs = async () => {
    try {
      console.log("🔍 Gọi API getRelatedDocuments cho từng category:", categoryIds);

      // Gọi song song các API
      const allResults = await Promise.all(
        categoryIds.map((id) => getRelatedDocuments([id]))
      );

      // Gộp tất cả documents từ các phản hồi
      const docsFlat = allResults
        .map((res) => res?.documents || res?.data?.documents || [])
        .flat();

      // Tạo map để loại trùng + tính điểm
      const docMap = new Map();

      docsFlat.forEach((doc) => {
        if (!docMap.has(doc._id)) {
          docMap.set(doc._id, { ...doc, _priorityScore: 0 });
        }
        const current = docMap.get(doc._id);
        current._priorityScore += 1;
      });

      // Chuyển về mảng và lọc tài liệu hiện tại
      const scored = Array.from(docMap.values())
        .filter((d) => d._id !== document._id)
        .sort((a, b) => b._priorityScore - a._priorityScore);

      console.log("📄 Danh sách tài liệu đã tính điểm ưu tiên:", scored);
      setRelatedDocs(scored);
    } catch (err) {
      console.error("❌ Lỗi khi tải tài liệu liên quan:", err);
      setRelatedDocs([]);
    }
  };

  fetchDocs();
}, [document._id]);


  const visibleDocs = showAll ? relatedDocs : relatedDocs.slice(0, 3);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Tài liệu liên quan</h2>
      <div className="space-y-4">
        {relatedDocs.length === 0 ? (
          <p className="text-sm text-gray-500 italic">Không có tài liệu liên quan.</p>
        ) : (
          <>
            {visibleDocs.map((doc) => (
              <div
                key={doc._id}
                onClick={() => navigate(`/documents/detail/${doc._id}`)}
                className="cursor-pointer related-doc bg-gray-50 hover:bg-white rounded-lg p-4 border border-gray-200 transition-all duration-300"
              >
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                    <i className={`fas ${doc.fileUrl?.endsWith(".pdf") ? "fa-file-pdf" : "fa-file-alt"}`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm mb-1">{doc.title}</h4>
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="mr-2">
                        <i className="fas fa-download mr-1" /> {doc.downloadCount || 0}
                      </span>
                      <span>
                        <i className="fas fa-star text-yellow-400 mr-1" /> {doc.avgRating?.toFixed?.(1) || "Chưa đánh giá"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {relatedDocs.length > 3 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium mt-4"
              >
                <i className={`fas fa-chevron-${showAll ? "up" : "down"} mr-2`} />
                {showAll ? "Ẩn bớt" : "Xem thêm"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

RelatedDocument.propTypes = {
  document: PropTypes.object.isRequired,
};

export default RelatedDocument;
