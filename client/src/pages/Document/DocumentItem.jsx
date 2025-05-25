import { IoDocumentAttachOutline } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../components/Service/DocumentService";
import { useEffect, useState } from "react";
function DocumentItem({ props }) {
  const { item } = props;
  const navigate = useNavigate();
  const [uploaderName, setUploaderName] = useState("Đang tải...");
  // console.log(item);
  useEffect(() => {
    if (item.uploadedBy) {
      getUserById(item.uploadedBy)
        .then((user) => {
          setUploaderName(user.fullName || "Ẩn danh");
        })
        .catch(() => {
          setUploaderName("Ẩn danh");
        });
    }
  }, [item.uploadedBy]);

  const handleClick = () => {
    navigate(`/documents/detail/${item._id}`);
  };

  const formatCategoryName = (cat) =>
    cat
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  return (
    <div
      className="document__item bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 relative cursor-pointer hover:-translate-y-1 hover:shadow-lg"
      onClick={handleClick}
    >
      {/* Badge */}
      <div
        className={`absolute top-[-8px] right-[-8px] px-3 py-1 rounded-full text-xs font-semibold ${
          item.type === "exam" ? "bg-red-500 text-white" : "bg-green-500 text-white"
        }`}
      >
        {item.type === "exam" ? "Exam" : "Document"}
      </div>

      <div className="p-6">
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3 text-blue-600">
            <IoDocumentAttachOutline size={24} />
          </div>
          <div className="ml-4 flex-grow">
            <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">{item.title}</h3>
            <p className="text-sm text-gray-500 mt-1">Uploaded by {uploaderName}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {item.categories?.map((cat) => (
            <span
              key={cat}
              className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full select-none"
            >
              {formatCategoryName(cat)}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <FaDownload className="mr-1" />
            <span>{item.downloadCount} lượt tải xuống</span>
          </div>
          <div className="flex items-center">
            <i className="far fa-calendar-alt mr-1"></i>
            <span>{new Date(item.updatedAt).toLocaleDateString("vi-VN")}</span>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
        <button className="w-full py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition">
          Chi tiết
        </button>
      </div>
    </div>
  );
}

export default DocumentItem;