import React, { useState, useEffect } from "react";
import "./EditProfile.scss";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditProfile() {
    const [formData, setFormData] = useState({
        username: "",
        fullName: "",
        email: "",
        phone: "",
        address: "",
        birthday: "",
        password: "",
        avatarUrl: "",
        role: "",
    });

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
                
                if (result) {
                    setFormData({
                        username: result.username || "",
                        fullName: result.fullName || "",
                        email: result.email || "",
                        phone: result.phone || "",
                        address: result.address || "",
                        birthday: result.birthday ? result.birthday.slice(0, 10) : "",
                        password: "",
                        avatarUrl: result.avatarUrl || "",
                        role: result.role || "",
                    });
                }
            } catch (error) {
                console.error("Fetch user error:", error);
            }
        };

        fetchApi();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({ ...prev, avatarUrl: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:3055/api/v1/users/update ", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    toast.success("Cập nhật thành công!");
    navigate("/"); // Quay về trang chủ
  } catch (error) {
    toast.error("Cập nhật thất bại: " + error.message);
  }
};
    return (
        <div className="edit-profile">
            <h2>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-avatar">
                    <img src={formData.avatarUrl || "img/cat1.png"} alt="Avatar" className="avatar-preview" />
                    <label htmlFor="avatar-upload" className="avatar-upload-btn">
                        Chọn ảnh
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        id="avatar-upload"
                        onChange={handleAvatarUpload}
                        style={{ display: "none" }}
                    />
                </div>


                <div className="form-group">
                    <label>Username</label>
                    <input name="username" value={formData.username} disabled />
                </div>

                <div className="form-group">
                    <label>Full Name</label>
                    <input name="fullName" value={formData.fullName} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input name="email" value={formData.email} disabled />
                </div>

                <div className="form-group">
                    <label>Phone</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Address</label>
                    <input name="address" value={formData.address} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Birthday</label>
                    <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Role</label>
                    <input name="role" value={formData.role} disabled />
                </div>

                <div className="form-actions">
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>
    );
}

export default EditProfile;
