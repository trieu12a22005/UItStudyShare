import React, { useEffect, useRef, useState } from "react";

const CommentItem = ({ comment, userMap, getReplies, onSubmitReply }) => {
  const username = userMap[comment.idUser] || "Ẩn danh";
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    if (isReplying && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isReplying]);

  const handleSendReply = async () => {
    if (!replyContent.trim()) return;
    setReplyLoading(true);
    try {
      await onSubmitReply(comment._id, replyContent);
      setReplyContent("");
      setIsReplying(false);
    } catch (err) {
      alert("Lỗi khi gửi trả lời");
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

          <div className="mt-2 text-sm text-blue-500">
  <button
    onClick={() => {
  const mention = `@${username} `;
  setIsReplying(true);
  setReplyContent(mention);

  // Đặt con trỏ về cuối sau render
  setTimeout(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(mention.length, mention.length);
    }
  }, 0);
}}

    className="hover:underline"
  >
    Trả lời
  </button>
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

        {replies.length > 0 && (
          <div className="mt-4 pl-4 border-l-2 border-gray-200">
            {replies.map((reply) => (
              <CommentItem
                key={reply._id}
                comment={reply}
                userMap={userMap}
                getReplies={getReplies}
                onSubmitReply={onSubmitReply}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;
