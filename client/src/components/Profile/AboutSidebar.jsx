import { useEffect, useState } from "react";
import { get } from "../../utils/request";

export default function AboutSidebar() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await get("users/detail");
        console.log("Thông tin người dùng:", result);
        setData(result);
      } catch (error) {
        console.error("Lỗi lấy thông tin người dùng:", error);
      }
    };
    fetchApi();
  }, []);

  // Format thời gian (ví dụ hiển thị ngày sinh dạng dd/mm/yyyy)
  const formatDate = (dateStr) => {
    if (!dateStr) return "Chưa cập nhật";
    const d = new Date(dateStr);
    return d.toLocaleDateString("vi-VN");
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <i className="fas fa-user-circle mr-2 text-indigo-600"></i> About
      </h2>
      <div className="space-y-4">
        <div>
          <p className="text-gray-500 text-sm">Ngày Tham Gia</p>
          <p className="font-medium">{formatDate(data.createdAt)}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Trường</p>
          <p className="font-medium">{data.university || "Chưa cập nhật"}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Ngành</p>
          <p className="font-medium">{data.major || "Chưa cập nhật"}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Birthday</p>
          <p className="font-medium">{formatDate(data.birthday)}</p>
        </div>
        
      </div>
    </div>
  );
}
