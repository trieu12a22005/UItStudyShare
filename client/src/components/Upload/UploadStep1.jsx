import React from "react";
import { CloudUpload } from "lucide-react";
import { toast } from "react-toastify";

function UploadStep1({ next, updateFormData, formData }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      updateFormData({ file });
    }
  };

  const handleNext = () => {
    if (formData.file) {
      next();
    } else {
      toast.error("Vui lòng chọn tệp trước khi tiếp tục.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="text-sm text-gray-600 mb-4">
        Tài liệu học tập / <span className="font-semibold">Tải tài liệu lên</span>
      </div>
      <div className="bg-white rounded-md shadow p-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Tải tài liệu lên</h2>
        <div className="flex justify-between items-center mb-6">
          {["Chọn tệp", "Thông tin", "Xác nhận"].map((label, index) => (
            <div key={index} className="text-center flex-1 relative">
              <div
                className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  index === 0
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
        <div className="border border-dashed border-gray-400 rounded-xl p-10 text-center bg-gray-50">
          <div className="flex justify-center mb-4">
            <CloudUpload className="w-12 h-12 text-blue-500" />
          </div>
          <p className="font-semibold text-lg">Chọn tệp để gửi</p>
          <p className="text-sm text-gray-500 mt-1 mb-4">
            Hỗ trợ định dạng pdf, docx, pptx, xlsx (tối đa 50mb)
          </p>

          <label className="inline-block bg-blue-500 text-white px-6 py-2 rounded cursor-pointer hover:bg-blue-600">
            Chọn file
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {formData.file && (
            <p className="text-sm text-green-600 mt-3">
              Đã chọn: {formData.file.name}
            </p>
          )}
        </div>
        <div className="flex justify-end mt-6">
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

export default UploadStep1;
