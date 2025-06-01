import React from "react";
import { toast } from "react-toastify";

function UploadStep2({ next, prev, updateFormData, formData }) {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (!formData.title || !formData.subject || !formData.tags) {
      toast.error("Vui lòng điền đầy đủ thông tin trước khi tiếp tục.");
      return;
    }
    next();
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="text-sm text-gray-600 mb-4">
        Tài liệu học tập / <span className="font-semibold">Tải tài liệu lên</span>
      </div>

      <div className="bg-white rounded-md shadow p-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Tải tài liệu lên</h2>
        <div className="flex justify-between items-center mb-6">
          {["Chọn tệp", "Thông tin", "Xác nhận"].map((label, index) => (
            <div key={index} className="text-center flex-1 relative">
              <div
                className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  index === 1
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-gray-100 text-gray-500 border-gray-300"
                }`}
              >
                {index + 1}
              </div>
              <div className="mt-1 text-sm font-medium">{label}</div>
              {index < 2 && (
                <div className="absolute top-4 right-[-50%] w-full border-b border-dashed border-gray-400 z-[-1]"></div>
              )}
            </div>
          ))}
        </div>
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-3">Thông tin tài liệu</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block font-medium mb-1">Tiêu đề</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Nhập tiêu đề"
                className="w-full border px-4 py-2 rounded"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Môn</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Chọn môn học liên quan"
                className="w-full border px-4 py-2 rounded bg-gray-100"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Tag</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Chọn/nhập"
                className="w-full border px-4 py-2 rounded bg-gray-100"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block font-medium mb-1">Mô Tả</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Mô tả ngắn ngọn nội dung tài liệu"
              rows={3}
              className="w-full border px-4 py-2 rounded"
            />
          </div>
        </div>
        <div className="flex justify-between">
          <button
            onClick={prev}
            className="px-6 py-2 border rounded hover:bg-gray-100"
          >
            Quay lại
          </button>
          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadStep2;
