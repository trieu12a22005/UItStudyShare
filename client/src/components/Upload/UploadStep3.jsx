import React from "react";

function UploadStep3({ prev, formData }) {
  const handleSubmit = async () => {
    const form = new FormData();
    form.append("file", formData.file);
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("type", "document");
    form.append("Subject", formData.subject);

    try {
      const response = await fetch("https://be-ltw.vercel.app/api/v1/documents/upload", {
        method: "POST",
        credentials: "include",
        body: form,
      });

      const result = await response.json();
      if (response.ok) {
        alert("Tải lên thành công!");
        console.log("Kết quả:", result);
      } else {
        alert("Thất bại: " + result.error);
      }
    } catch (err) {
      console.error("Lỗi mạng:", err);
      alert("Lỗi mạng khi gửi yêu cầu.");
    }
  };


  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      <div className="text-sm text-gray-600 mb-4">
        Tài liệu học tập / <span className="font-semibold">Tải tài liệu lên</span>
      </div>

      <div className="bg-white rounded-md shadow p-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Tải tài liệu lên</h2>

        {/* Steps Indicator */}
        <div className="flex justify-between items-center mb-6">
          {["Chọn tệp", "Thông tin", "Xác nhận"].map((label, index) => (
            <div key={index} className="text-center flex-1 relative">
              <div
                className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center border-2 ${index === 2
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block font-medium mb-1">Tiêu đề</label>
            <input
              type="text"
              value={formData.title}
              disabled
              className="w-full border px-4 py-2 rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">File</label>
            <input
              type="text"
              value={formData.file?.name || ""}
              disabled
              className="w-full border px-4 py-2 rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Môn học</label>
            <input
              type="text"
              value={formData.subject}
              disabled
              className="w-full border px-4 py-2 rounded bg-gray-100"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Tag</label>
            <input
              type="text"
              value={formData.tags}
              disabled
              className="w-full border px-4 py-2 rounded bg-gray-100"
            />
          </div>
        </div>
        {formData.description && (
          <div className="mb-6">
            <label className="block font-medium mb-1">Mô tả</label>
            <textarea
              value={formData.description}
              disabled
              className="w-full border px-4 py-2 rounded bg-gray-100"
              rows={3}
            />
          </div>
        )}
        <div className="flex justify-between">
          <button
            onClick={prev}
            className="px-6 py-2 border rounded hover:bg-gray-100"
          >
            Quay lại
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadStep3;
