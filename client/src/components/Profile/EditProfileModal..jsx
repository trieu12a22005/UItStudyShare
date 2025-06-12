import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function EditProfileModal({ isOpen, onClose }) {
  /* ──────────────────────── STATE ──────────────────────── */
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    birthday: "",
    avatarUrl: "",
    role: "",
    university: "",
    major: "",
  });
  const [initialData, setInitialData] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null); // ảnh mới (nếu chọn)

  /* ──────────────────────── FETCH CURRENT USER ──────────────────────── */
  useEffect(() => {
    if (!isOpen) return;

    (async () => {
      try {
        const res = await fetch("https://beltw-production.up.railway.app/api/v1/users/detail", {
          method: "GET",
          credentials: "include",
        });
        const result = await res.json();
        if (!res.ok) throw new Error(result.message);

        const userData = {
          username: result.username || "",
          fullName: result.fullName || "",
          email: result.email || "",
          phone: result.phone || "",
          address: result.address || "",
          birthday: result.birthday ? result.birthday.slice(0, 10) : "",
          avatarUrl: result.avatar || "",      // BE trả về avatar
          role: result.role || "",
          university: result.university || "",
          major: result.major || "",
        };
        setFormData(userData);
        setInitialData(userData);
      } catch (err) {
        console.error(err);
        toast.error("Không thể tải thông tin người dùng.");
      }
    })();
  }, [isOpen]);

  /* ──────────────────────── HANDLERS ──────────────────────── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // trả về payload thay đổi
  const buildUpdatePayload = () => {
    const ALLOWED_FIELDS = [
      "fullName",
      "phone",
      "address",
      "birthday",
      "university",
      "major",
    ];
    const payload = {};
    if (!initialData) return payload;
    ALLOWED_FIELDS.forEach((f) => {
      if (formData[f] !== initialData[f]) payload[f] = formData[f];
    });
    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const diffPayload = buildUpdatePayload();

    // nếu không có gì thay đổi và không chọn avatar
    if (!avatarFile && Object.keys(diffPayload).length === 0) {
      toast.info("Không có thay đổi nào để cập nhật.");
      onClose();
      return;
    }

    try {
      let res, result;

      // Nếu có avatar mới ➜ gửi FormData
      if (avatarFile) {
        const fd = new FormData();
        Object.entries(diffPayload).forEach(([k, v]) => fd.append(k, v));
        fd.append("avatar", avatarFile); // field name 'avatar' backend phải support

        res = await fetch("https://beltw-production.up.railway.app/api/v1/users/update", {
          method: "PATCH",
          credentials: "include",
          body: fd,
        });
      } else {
        // Chỉ thay text field ➜ gửi JSON
        res = await fetch("https://beltw-production.up.railway.app/api/v1/users/update", {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(diffPayload),
        });
      }

      result = await res.json();
      if (!res.ok) throw new Error(result.message);
      toast.success("Cập nhật thành công!");
      onClose();
    } catch (err) {
      toast.error("Cập nhật thất bại: " + err.message);
    }
  };

  /* ──────────────────────── JSX ──────────────────────── */
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
      <div
        onClick={onClose}
        className="absolute inset-0 backdrop-blur-sm bg-black/20"
      />

      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative z-10 p-6 border">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b pb-2">
          <h3 className="text-2xl font-semibold text-indigo-700 flex items-center gap-2">
            <i className="fas fa-user-edit text-indigo-500" />
            Chỉnh sửa hồ sơ
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <i className="fas fa-times text-lg"></i>
          </button>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-6 relative group">
          {/* input file ẩn */}
          <input
            type="file"
            accept="image/*"
            id="avatar-upload"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (!file) return;
              setAvatarFile(file);

              // preview ảnh
              const reader = new FileReader();
              reader.onload = () =>
                setFormData((prev) => ({ ...prev, avatarUrl: reader.result }));
              reader.readAsDataURL(file);
            }}
          />

          {/* Label để click */}
          <label htmlFor="avatar-upload" className="cursor-pointer">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-300 shadow-md">
              <img
                src={formData.avatarUrl || "https://i.pravatar.cc/150"}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>

            {/* overlay icon khi hover */}
            <div className="absolute inset-0 w-24 h-24 mx-auto rounded-full bg-black/40 hidden group-hover:flex items-center justify-center text-white">
              <i className="fas fa-camera" />
            </div>
          </label>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "Tên đăng nhập", name: "username", disabled: true },
            { label: "Họ và tên", name: "fullName" },
            { label: "Email", name: "email", disabled: true },
            { label: "Số điện thoại", name: "phone" },
            { label: "Địa chỉ", name: "address" },
            { label: "Ngày sinh", name: "birthday", type: "date" },
            { label: "Trường đại học", name: "university" },
            { label: "Ngành học", name: "major" },
            { label: "Vai trò", name: "role", disabled: true },
          ].map(({ label, name, disabled, type = "text" }) => (
            <div key={name}>
              <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {label}
              </label>
              <input
                id={name}
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                disabled={disabled}
                className={`w-full px-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none ${disabled ? "bg-gray-100 text-gray-500" : "bg-white"
                  }`}
              />
            </div>
          ))}

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold"
            >
              Lưu thay đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
