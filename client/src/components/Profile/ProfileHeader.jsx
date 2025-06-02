import { useEffect, useState } from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import EditProfileModal from "./EditProfileModal.";
import { get, patch } from "../../utils/request";
import { toast } from "react-toastify";

export default function ProfileHeader() {
  const [data, setData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
    const [showShareModal, setShowShareModal] = useState(false);

const profileUrl = window.location.href;



  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await get("users/detail");
        setData(result);
      } catch (error) {
        console.error("Fetch user error:", error);
      }
    };
    fetchApi();
  }, []);
const handleShareClick = () => {
  navigator.clipboard.writeText(profileUrl)
    .then(() => {
      setShowShareModal(true);
    })
    .catch(() => toast.error("Không thể sao chép liên kết!"));
};

  return (
    <>
      <div className="bg-[#3188F2] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center">
            <div className="mb-6 md:mb-0 md:mr-8">
              <Avatar
                size={128}
                src={data.avatarUrl || null}
                style={{ backgroundColor: "#87d068" }}
                icon={!data.avatarUrl && <UserOutlined />}
              />
            </div>
            <div className="text-white">
              <h1 className="text-3xl font-bold">{data.fullName || "Chưa có tên"}</h1>
              <p className="text-indigo-100 mt-1">@{data.username}</p>
              <p className="mt-2 flex items-center">
                <i className="fas fa-graduation-cap mr-2"></i> {data.role || "Student"}
              </p>
              <div className="mt-4 flex flex-wrap gap-4">
                <span><i className="fas fa-envelope mr-2"></i> {data.email}</span>
                <span><i className="fas fa-phone mr-2"></i> {data.phone}</span>
                <span><i className="fas fa-map-marker-alt mr-2"></i> {data.address || "Chưa cập nhật"}</span>
              </div>
              <div className="mt-6 flex space-x-4">
                <button onClick={() => setIsEditing(true)} className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition">
                  <i className="fas fa-edit mr-2"></i> Edit Profile
                </button>
                <button
  onClick={handleShareClick}
  className="bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-800 transition"
>
  <i className="fas fa-share-alt mr-2"></i> Share
</button>

              </div>
            </div>
          </div>
        </div>
      </div>
        {showShareModal && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm mx-4 p-6 relative">
      <h2 className="text-lg font-semibold mb-4 text-indigo-700 flex items-center">
        <i className="fas fa-share-alt mr-2"></i> Chia sẻ hồ sơ
      </h2>

      <p className="text-sm text-gray-600 mb-2">Đường dẫn hồ sơ:</p>
      <div className="flex items-center border rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          readOnly
          value={profileUrl}
          className="flex-1 px-3 py-2 text-sm text-gray-700 bg-gray-100 outline-none"
        />
        <button
  onClick={() => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("Liên kết đã được sao chép!");
  }}
  className="bg-indigo-600 text-white px-3 py-2 text-sm hover:bg-indigo-700 transition"
>
  Sao chép
</button>

      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setShowShareModal(false)}
          className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50 transition"
        >
          Đóng
        </button>
      </div>
    </div>
  </div>
)}

      {/* Modal hiển thị khi isEditing = true */}
      <EditProfileModal isOpen={isEditing} onClose={() => setIsEditing(false)} />
    </>
  );
}
