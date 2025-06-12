

// import React, { useState } from "react";
import { Button, Flex, Form, Input } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
function ChangePassword() {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log(values.Password);
    if (values.Password !== values.comfirmPassword) {
      toast.error("Mật khẩu nhập lại không khớp!");
      return;
    }
    try {
      const response = await fetch("https://beltw-production.up.railway.app/api/v1/users/password/change", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔥 BẮT BUỘC để trình duyệt gửi HTTP-Only Cookie
        body: JSON.stringify({
          oldPassword: values.oldPassword, // 🔥 Đảm bảo tên key đúng
          newPassword: values.Password
        }),
      });

      const result = await response.json();


      if (!response.ok) {
        throw new Error(`Lỗi ${result.code}: ${result.message}`);
      }

      if (result) {
        toast.success("Đặt lại mật khẩu thành công! Vui lòng đăng nhập lại.");
        navigate("/login"); // 🔥 Điều hướng về trang login thay vì reset-password
      }
    } catch (error) {
      toast.error(`Đặt lại mật khẩu thất bại: ${error.message}`);
    }
  };

  return (
    <div className="mt-[200px] ml-[500px] mr-[500px]">
      <h1 className="mb-[50px] text-4xl font-bold text-center text-[#314876]">
        THAY ĐỔI MẬT KHẨU
      </h1>
      <Form
        name="change-password"
        labelCol={{ flex: "130px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Mật khẩu hiện tại"
          name="oldPassword"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="Password"
          rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu"
          name="comfirmPassword"
          rules={[{ required: true, message: "Vui lòng xác nhận mật khẩu" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label=" ">
          <Button type="primary" htmlType="submit" className="ml-[20px]">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default ChangePassword;