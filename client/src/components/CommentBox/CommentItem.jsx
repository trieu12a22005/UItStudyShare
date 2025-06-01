import React, { useEffect, useRef, useState } from "react";
import { changeComment, deleteComment } from "../Service/DocumentService";
import { toast } from "react-toastify";
const CommentItem = ({ comment, userMap, getReplies, onSubmitReply, onRefresh }) => {

  const username = userMap[comment.idUser] || "Ẩn danh";
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const inputRef = useRef();
// console.log("comment.idUser:", comment.idUser);
// console.log("isOwn:", comment.isOwn);

  useEffect(() => {
    if (isReplying && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isReplying]);

  const handleSendReply = async () => {
  if (!replyContent.trim()) return;
  setReplyLoading(true);
  try {
    if (replyContent === comment.content) {
      alert("Nội dung không thay đổi.");
    } else if (replyContent.startsWith(`@${username} `)) {
      // Đây là reply
      await onSubmitReply(comment._id, replyContent);
    } else if (comment.isOwn) {
      // Đây là sửa comment
      await changeComment(comment.toId, comment.type, comment._id, replyContent, comment.token);
      await onRefresh();
    }
    setReplyContent("");
    setIsReplying(false);
  } catch (err) {
    alert("Lỗi khi gửi!");
  }
  setReplyLoading(false);
};


  const replies = getReplies ? getReplies(comment._id) : [];

  return (
    <div className="flex items-start mt-4" key={comment._id}>
      <div className="w-10 h-10 bg-blue-100 rounded-full flex justify-center items-center text-blue-600 mr-3">
        <i className="fas fa-user" />
      </div>
      <div className="flex-1">
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800">{username}</h4>
          <span className="text-xs text-gray-500">
            {new Date(comment.createdAt).toLocaleDateString("vi-VN")}
          </span>
          <p className="text-gray-700 mt-1">{comment.content}</p>

          <div className="mt-3 flex gap-3 text-sm">
  <button
    onClick={() => {
      const mention = `@${username} `;
      setIsReplying(true);
      setReplyContent(mention);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.setSelectionRange(mention.length, mention.length);
        }
      }, 0);
    }}
    className="text-blue-600 hover:text-blue-800 hover:underline transition"
  >
    💬 Trả lời
  </button>

  {comment.isOwn && (
    <button
      onClick={() => {
        setIsReplying(true);
        setReplyContent(comment.content);
      }}
      className="text-yellow-600 hover:text-yellow-800 hover:underline transition"
    >
      ✏️ Sửa
    </button>
  )}

  {comment.isOwn && (
    <button
      onClick={async () => {
        if (window.confirm("Bạn có chắc muốn xóa comment này?")) {
          try {
            await deleteComment(comment.toId, comment.type, comment._id, comment.token);
            toast.success("Đã xóa comment!");
            await onRefresh(); // hoặc gọi hàm cập nhật danh sách comment
          } catch (err) {
            toast.error("Lỗi khi xóa comment!");
          }
        }
      }}
      className="text-red-600 hover:text-red-800 hover:underline transition"
    >
      🗑️ Xóa
    </button>
  )}
</div>
          {isReplying && (
            <div className="mt-3">
              <textarea
                ref={inputRef}
                rows={2}
                className="w-full px-3 py-2 border rounded"
                placeholder="Nhập trả lời..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <div className="flex justify-end mt-1">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={handleSendReply}
                  disabled={replyLoading}
                >
                  {replyLoading ? "Đang gửi..." : "Gửi trả lời"}
                </button>
              </div>
            </div>
          )}
        </div>

        {replies.map((reply) => (
  <CommentItem
    key={reply._id}
    comment={{
      ...reply,
      isOwn: String(reply.idUser) === String(comment.idUser), // hoặc dùng userId nếu có trong props
      token: comment.token,
      toId: comment.toId,
      type: comment.type,
    }}
    userMap={userMap}
    getReplies={getReplies}
    onSubmitReply={onSubmitReply}
    onRefresh={onRefresh}
  />
))}

      </div>
    </div>
  );
};

export default CommentItem;