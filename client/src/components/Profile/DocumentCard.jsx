import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserById } from "../Service/DocumentService";

export default function DocumentCard({ item }) {
  const navigate = useNavigate();
  const [uploaderName, setUploaderName] = useState("Đang tải...");

  const iconMap = {
    PDF: { icon: "fa-file-pdf", color: "text-red-500" },
    DOCX: { icon: "fa-file-word", color: "text-blue-500" },
    PNG: { icon: "fa-file-image", color: "text-green-500" },
    MP4: { icon: "fa-file-video", color: "text-purple-500" },
    UNKNOWN: { icon: "fa-file", color: "text-gray-400" }
  };

  const {
    fileType = "UNKNOWN",
    description: desc,
    type,
    title,
    avgRating,
    _id: id,
    slug
  } = item;

  const { icon, color } = iconMap[fileType] || iconMap["UNKNOWN"];

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

  const handleNavigate = async () => {
    if (slug) {
      navigate(`/documents/${slug}`);
    } else {
      try {
        const res = await fetch(`https://beltw-production.up.railway.app/api/v1/documents/detail/${id}`, {
          credentials: 'include'
        });
        if (res.redirected) {
          const newUrl = res.url.replace('https://beltw-production.up.railway.app', '');
          navigate(newUrl);
        } else {
          const data = await res.json();
          if (data.document?.slug) {
            navigate(`/documents/${data.document.slug}`);
          }
        }
      } catch (error) {
        console.error("Lỗi lấy slug:", error);
      }
    }
  };

  return (
    <div className="profiledoc-card bg-white rounded-lg shadow overflow-hidden transition duration-300 w-full min-w-[250px] h-full flex flex-col justify-between">
      <div className="p-4 cursor-pointer" onClick={handleNavigate}>
        <div className="flex justify-between items-start mb-2">
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {type || "Tài liệu"}
          </span>
          <div className="flex items-center text-yellow-400">
            <i className="fas fa-star"></i>
            <span className="ml-1 text-gray-700 font-medium">{avgRating?.toFixed(1) || "?"}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{desc}</p>

        <div className="text-xs text-gray-400 mt-1">Người đăng: {uploaderName}</div>
      </div>

      <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
        <div className="flex items-center text-gray-500 text-sm">
          <i className="fas fa-download mr-1"></i>
          <span>{item.downloadCount || 0} downloads</span>
        </div>
        <div className="flex space-x-2">
          <Link to={slug ? `/documents/${slug}` : `/documents/detail/${id}`} className="text-indigo-600 hover:text-indigo-800">
            <i className="fas fa-eye"></i>
          </Link>
          <button className="text-indigo-600 hover:text-indigo-800">
            <i className="fas fa-download"></i>
          </button>
          <button className="text-indigo-600 hover:text-indigo-800">
            <i className="fas fa-share-alt"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
