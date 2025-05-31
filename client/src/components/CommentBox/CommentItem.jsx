import React from "react";

const CommentItem = ({
  comment,
  userMap,
  onReply,
  replyTo,
  replyContent,
  setReplyContent,
  handleReplySubmit,
  replyLoading,
}) => {
  const username = userMap[comment.idUser] || "Ẩn danh";
  const isBeingReplied = replyTo?._id === comment._id;

  return (
    <div className="mb-2">
      <div className="flex items-start">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex justify-center items-center text-blue-600 mr-2">
          <i className="fas fa-user text-sm" />
        </div>
        <div className="flex-1">
          <div className="bg-gray-50 rounded-lg p-3">
            <h4 className="font-medium text-gray-800 text-sm">{username}</h4>
            <span className="text-xs text-gray-500">
              {new Date(comment.createdAt).toLocaleDateString("vi-VN")}
            </span>
            <p className="text-gray-700 text-sm mt-1">{comment.content}</p>

            <div className="mt-2 text-sm">
              <button
                className="text-blue-500 hover:underline"
                type="button"
                onClick={onReply}
              >
                Trả lời
              </button>
            </div>

            {isBeingReplied && (
              <div className="mt-3">
                <textarea
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  value={replyContent}
                  onChange={e => setReplyContent(e.target.value)}
                  autoFocus
                />
                <div className="flex justify-end mt-1">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                    onClick={handleReplySubmit}
                    disabled={replyLoading}
                  >
                    {replyLoading ? "Đang gửi..." : "Gửi trả lời"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(CommentItem);
