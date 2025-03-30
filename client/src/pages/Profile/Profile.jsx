import React, { useState, useEffect } from "react";
import "./Profile.scss";
import { Link } from "react-router-dom";

function Profile({ user, onSave }) {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    address: "",
    birthday: "",
    password: "",
    avatarUrl: "",
  });
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await fetch("http://localhost:3055/api/v1/users/detail", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // để gửi cookie
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(`Lỗi ${result.code}: ${result.message}`);
        }
        if (result) {
          setData(result);
        }
      } catch (error) {
        console.error("Fetch user error:", error);
      }
    };

    fetchApi();
  }, []);
  console.log(data)
  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        phone: user.phone || "",
        address: user.address || "",
        birthday: user.birthday ? user.birthday.slice(0, 10) : "", // yyyy-mm-dd
        password: "",
        avatarUrl: user.avatarUrl || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); 
  };

  return (
    <div className="edit-profile">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-avatar">
          <img src={formData.avatarUrl || "img/cat1.png"} alt="Avatar" />
        </div>

        <div className="form-group">
          <label>Username</label>
          <input
            name="username"
            value={data.username}
            onChange={handleChange}
            disabled = "true"
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            name="phone"
            value={data.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Birthday</label>
          <input
            type="date"
            name="birthday"
            value={data.birthday?.split("T")[0] || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit">
            <Link to="/profile/edit" >Edit</Link>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
