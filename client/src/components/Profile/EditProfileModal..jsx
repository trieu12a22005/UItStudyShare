import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function EditProfileModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    birthday: "",
    avatarUrl: "",
    role: "",
  });

  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch("http://localhost:3055/api/v1/users/detail", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(`Lỗi ${result.code}: ${result.message}`);
        }

        const userData = {
          username: result.username || "",
          fullName: result.fullName || "",
          email: result.email || "",
          phone: result.phone || "",
          address: result.address || "",
          birthday: result.birthday ? result.birthday.slice(0, 10) : "",
          avatarUrl: result.avatarUrl || "",
          role: result.role || "",
        };

        setFormData(userData);
        setInitialData(userData);
      } catch (error) {
        console.error("Fetch user error:", error);
        toast.error("Không thể tải thông tin người dùng.");
      }
    };

    if (isOpen) fetchApi(); // chỉ fetch khi mở modal
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const buildUpdatePayload = () => {
    const ALLOWED_FIELDS = ["fullName", "phone", "address", "birthday"];
    const payload = {};
    if (!initialData) return payload;

    ALLOWED_FIELDS.forEach((field) => {
      if (formData[field] !== initialData[field]) {
        payload[field] = formData[field];
      }
    });

    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatePayload = buildUpdatePayload();
    if (Object.keys(updatePayload).length === 0) {
      toast.info("Không có thay đổi nào để cập nhật.");
      onClose();
      return;
    }

    try {
      const response = await fetch("http://localhost:3055/api/v1/users/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(updatePayload),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      toast.success("Cập nhật thành công!");
      onClose();
    } catch (error) {
      toast.error("Cập nhật thất bại: " + error.message);
    }
  };

  return (
   <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
  <div onClick={onClose} className="absolute inset-0 backdrop-blur-sm bg-black/20 transition-opacity"></div>

  <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative z-10 p-6 border border-gray-200">
    <div className="flex justify-between items-center mb-6 border-b pb-2">
      <h3 className="text-2xl font-semibold text-indigo-700 flex items-center gap-2">
        <i className="fas fa-user-edit text-indigo-500"></i>
        Chỉnh sửa hồ sơ
      </h3>
      <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
        <i className="fas fa-times text-lg"></i>
      </button>
    </div>

    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        { label: "Tên đăng nhập", name: "username", disabled: true },
        { label: "Họ và tên", name: "fullName" },
        { label: "Email", name: "email", disabled: true },
        { label: "Số điện thoại", name: "phone" },
        { label: "Địa chỉ", name: "address" },
        { label: "Ngày sinh", name: "birthday", type: "date" },
        { label: "Vai trò", name: "role", disabled: true },
      ].map(({ label, name, disabled, type = "text" }) => (
        <div key={name}>
          <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          <input
            id={name}
            name={name}
            type={type}
            value={formData[name]}
            onChange={handleChange}
            disabled={disabled}
            className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white'}`}
          />
        </div>
      ))}

      <div className="mt-6 flex justify-end space-x-3">
        <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition">
          Hủy
        </button>
        <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-semibold">
          Lưu thay đổi
        </button>
      </div>
    </form>
  </div>
</div>

  );
}
