import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  getUserById,
  increaseDownloadCount,
  rateDocument,
  getNameCategoryById,
  postReportDocument,
} from '../Service/DocumentService';

function DocumentHeader({ document, token, userId }) {
  const [uploaderName, setUploaderName] = useState("Đang tải...");
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [userScore, setUserScore] = useState(null);
  const [categoryNames, setCategoryNames] = useState({});
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    const uploaderId = document?.uploadedBy;
    if (uploaderId) {
      getUserById(uploaderId)
        .then((user) => {
          setUploaderName(user.fullName || "Ẩn danh");
        })
        .catch(() => {
          setUploaderName("Ẩn danh");
        });
    } else {
      setUploaderName("Không rõ");
    }
  }, [document]);

  useEffect(() => {
    if (document?.ratings && userId) {
      const existing = document.ratings.find(r => r.idUser === userId);
      if (existing) {
        setSubmitted(true);
        setUserScore(existing.score);
      }
    }
  }, [document, userId]);

  useEffect(() => {
    const fetchCategoryNames = async () => {
      if (!document?.category) return;

      const namesMap = {};

      await Promise.all(
        document.category.map(async (cat) => {
          try {
            const res = await getNameCategoryById(cat.categoryId);
            namesMap[cat.categoryId] = res.category?.name || "Không rõ";
          } catch (err) {
            console.error(`Không lấy được tên cho categoryId ${cat.categoryId}`, err);
            namesMap[cat.categoryId] = "Không rõ";
          }
        })
      );

      setCategoryNames(namesMap);
    };

    fetchCategoryNames();
  }, [document]);

  if (!document) return null;

  const {
    title,
    createdAt,
    downloadCount,
    category,
    type,
    avgRating
  } = document;

  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toLocaleDateString("vi-VN") : "Chưa rõ ngày";

  const handleDownload = async () => {
    if (!userId) {
      toast.error("Bạn cần đăng nhập để tải xuống.");
      return;
    }
    try {
      const blob = await increaseDownloadCount(document._id);
      toast.success("Bắt đầu tải xuống...");
      const url = window.URL.createObjectURL(blob);

      const a = window.document.createElement("a");
      a.href = url;
      a.download = `${document.title || "download"}.pdf`;
      window.document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Không thể tải file.");
    }
  };

  const handleShare = () => {
    if (!userId) {
      toast.error("Bạn cần đăng nhập để chia sẻ.");
      return;
    }
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => toast.info("Đã sao chép liên kết chia sẻ!"))
      .catch(() => toast.error("Không thể sao chép liên kết!"));
  };

  const submitRating = async () => {
    if (!userId) {
      toast.error("Bạn cần đăng nhập để đánh giá.");
      return;
    }
    if (submitted) {
      toast.warn("Bạn đã đánh giá tài liệu này rồi.");
      return;
    }
    if (rating > 0) {
      try {
        await rateDocument(document._id, rating, token);
        toast.success(`Bạn đã đánh giá ${rating} sao. Cảm ơn bạn!`);
        setSubmitted(true);
        setShowRating(false);
        setUserScore(rating);
      } catch (err) {
        toast.error("Không thể gửi đánh giá.");
        console.error(err);
      }
    } else {
      toast.error("Vui lòng chọn ít nhất 1 sao.");
    }
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      toast.error("Bạn cần đăng nhập để báo cáo.");
      return;
    }
    const reason = e.target.reason.value;
    const details = e.target.details.value;

    try {
      await postReportDocument(document._id, reason, details, token);
      toast.success("Cảm ơn bạn đã báo cáo. Chúng tôi sẽ xem xét trong thời gian sớm nhất.");
      setShowReportModal(false);
    } catch (err) {
      console.error("Lỗi khi gửi báo cáo:", err);
      toast.error("Không thể gửi báo cáo. Vui lòng thử lại sau.");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex flex-col md:flex-row">
        <div className="w-20 h-20 rounded-lg bg-red-100 flex items-center justify-center text-red-500 mr-6 mb-4 md:mb-0">
          <i className={`fas ${type === 'exam' ? 'fa-file-alt' : 'fa-file-pdf'} text-4xl`} />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-2xl font-bold text-gray-800">
              {title || "Không có tiêu đề"}
            </h1>
            {typeof avgRating === 'number' && !isNaN(avgRating) && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-700">{avgRating.toFixed(1)} / 5</span>
                <div className="relative flex text-base text-gray-300">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star" />
                  ))}
                  <div
                    className="absolute top-0 left-0 overflow-hidden text-yellow-400 flex"
                    style={{ width: `${(avgRating / 5) * 100}%` }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <i key={i} className="fas fa-star" />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4">
            <span className="flex items-center mr-4 mb-2 md:mb-0">
              <i className="fas fa-user-graduate mr-1" /> {uploaderName}
            </span>
            <span className="flex items-center mr-4 mb-2 md:mb-0">
              <i className="fas fa-calendar-alt mr-1" /> {formatDate(createdAt)}
            </span>
            <span className="flex items-center mr-4 mb-2 md:mb-0">
              <i className="fas fa-download mr-1" /> {downloadCount} lượt tải
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium capitalize">{type}</span>
            {document.category?.map((cat, index) => {
              const categoryId = cat.categoryId;
              const categoryName = categoryNames[categoryId] || "Đang tải...";
              const colors = [
                { bg: 'bg-green-100', text: 'text-green-700' },
                { bg: 'bg-yellow-100', text: 'text-yellow-700' },
                { bg: 'bg-red-100', text: 'text-red-700' },
                { bg: 'bg-blue-100', text: 'text-blue-700' },
                { bg: 'bg-purple-100', text: 'text-purple-700' },
              ];
              const color = colors[index % colors.length];

              return (
                <span
                  key={categoryId}
                  className={`px-3 py-1 ${color.bg} ${color.text} rounded-full text-xs font-medium`}
                >
                  {categoryName}
                </span>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3 document-actions">
            <button
              onClick={handleDownload}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center"
            >
              <i className="fas fa-download mr-2" /> Tải xuống
            </button>

            <button
              onClick={() => {
                if (!userId) {
                  toast.error("Bạn cần đăng nhập để đánh giá.");
                  return;
                }
                setShowRating(!showRating);
              }}
              disabled={submitted}
              className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg font-medium border border-gray-300 flex items-center"
            >
              <i className="fas fa-star mr-2 text-yellow-500" />
              {submitted ? `Đã đánh giá (${userScore}★)` : "Đánh giá"}
            </button>

            <button
              onClick={handleShare}
              className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg font-medium border border-gray-300 flex items-center"
            >
              <i className="fas fa-share-alt mr-2 text-blue-500" /> Chia sẻ
            </button>

            <button
              onClick={() => {
                if (!userId) {
                  toast.error("Bạn cần đăng nhập để báo cáo.");
                  return;
                }
                setShowReportModal(true);
              }}
              className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg font-medium border border-gray-300 flex items-center"
            >
              <i className="fas fa-flag mr-2 text-orange-500" /> Báo cáo
            </button>
          </div>

          {showRating && !submitted && (
            <div className="mt-4">
              <div className="flex space-x-1 text-yellow-400 text-2xl mb-2 cursor-pointer">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`fas fa-star ${star <= rating ? "" : "text-gray-300"}`}
                    onClick={() => setRating(star)}
                  />
                ))}
              </div>
              <button
                onClick={submitRating}
                className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium"
              >
                Xác nhận đánh giá
              </button>
            </div>
          )}
        </div>
        {showReportModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
              <div className="border-b p-4 flex justify-between items-center">
                <h3 className="text-lg font-bold">
                  <i className="fas fa-flag text-red-500 mr-2"></i>
                  Báo cáo tài liệu
                </h3>
                <button onClick={() => setShowReportModal(false)} className="text-gray-500 hover:text-gray-700">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <form onSubmit={handleReportSubmit} className="p-6">
                <p className="text-gray-600 mb-4">Hãy cung cấp thông tin chi tiết về vấn đề bạn gặp phải.</p>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Lý do báo cáo</label>
                  <select name="reason" className="w-full border rounded-lg p-2 focus:ring-indigo-500" required>
                    <option value="">Chọn lý do</option>
                    <option value="copyright">Vi phạm bản quyền</option>
                    <option value="inappropriate">Nội dung không phù hợp</option>
                    <option value="incorrect">Thông tin sai</option>
                    <option value="spam">Spam hoặc gây hiểu lầm</option>
                    <option value="other">Lý do khác</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">Mô tả chi tiết</label>
                  <textarea name="details" className="w-full border rounded-lg p-3 focus:ring-indigo-500" rows="4" placeholder="Chi tiết vấn đề..." required />
                </div>
                <div className="flex justify-end space-x-3">
                  <button type="button" onClick={() => setShowReportModal(false)} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
                    Huỷ
                  </button>
                  <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center">
                    <i className="fas fa-paper-plane mr-2"></i> Gửi báo cáo
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentHeader;
