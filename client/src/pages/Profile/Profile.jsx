import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { patch } from "../../utils/request"; // Gọi API update
import "./Profile.scss";
import { toast } from "react-toastify";

function Profile() {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    address: "",
    birthday: "",
    avatarUrl: "",
  });

  const navigate = useNavigate();

  // Lấy thông tin người dùng từ API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3055/api/v1/users/detail", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        const result = await response.json();
        if (!response.ok) throw new Error(`Lỗi ${result.code}: ${result.message}`);

        setFormData({
          username: result.username || "",
          phone: result.phone || "",
          address: result.address || "",
          birthday: result.birthday ? result.birthday.slice(0, 10) : "",
          avatarUrl: result.avatarUrl || "",
        });
      } catch (error) {
        console.error("Fetch user error:", error);
        toast.error("Không thể tải thông tin người dùng.");
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { phone, address, birthday, avatarUrl } = formData;
      await patch("users/update", { phone, address, birthday, avatarUrl });

      toast.success("Cập nhật thành công!");
      navigate("/"); // Quay về trang chủ hoặc trang hồ sơ
    } catch (error) {
      toast.error("Cập nhật thất bại: " + error.message);
    }
  };

  return (
    <div className="edit-profile">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-avatar">
          <img src={formData.avatarUrl || "/img/cat1.png"} alt="Avatar" />
        </div>

        <div className="form-group">
          <label>Username</label>
          <input
            name="username"
            value={formData.username}
            disabled={true}
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Birthday</label>
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
