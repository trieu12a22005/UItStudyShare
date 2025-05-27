import React from "react";

const CommentItem = React.memo(({
  comment,
  userMap,
  replies,
  replyToId,
  setReplyToId,
  replyContent,
  setReplyContent,
  handleReplySubmit
}) => {
  const username = userMap[comment.idUser] || "Ẩn danh";
  const isBeingReplied = replyToId === comment._id;

  return (
    <div className="flex items-start">
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
                if (isBeingReplied) {
                  setReplyToId(null);
                  setReplyContent("");
                } else {
                  setReplyToId(comment._id);
                  setReplyContent(`@${username} `);
                }
              }}
              className="hover:underline"
            >
              Trả lời
            </button>
          </div>

          {isBeingReplied && (
            <div className="mt-3">
              <textarea
                rows={2}
                className="w-full px-3 py-2 border rounded"
                value={replyContent}
                onChange={e => setReplyContent(e.target.value)}
                autoFocus
              />
              <div className="flex justify-end mt-1">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                  onClick={handleReplySubmit}
                >
                  Gửi trả lời
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Reply 1 cấp */}
        {replies.length > 0 && (
          <div className="mt-4 pl-4 border-l-2 border-gray-200">
            {replies.map(r => (
              <div className="flex items-start mt-3" key={r._id}>
                <div className="w-8 h-8 bg-blue-100 rounded-full flex justify-center items-center text-blue-600 mr-2">
                  <i className="fas fa-user text-sm" />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <h4 className="font-medium text-gray-800 text-sm">
                      {userMap[r.idUser] || "Ẩn danh"}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {new Date(r.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                    <p className="text-gray-700 text-sm mt-1">{r.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

export default CommentItem;
