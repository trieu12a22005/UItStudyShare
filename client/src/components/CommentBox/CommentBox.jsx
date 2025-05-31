import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommentByDocumentId, getUserById, postComment } from "../Service/DocumentService";

function CommentBox({ token, userId }) {
  const { id: docId } = useParams();
  const [comments, setComments] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const [replyToId, setReplyToId] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);

  useEffect(() => {
    if (!docId) return;

    async function fetchCommentsAndUsers() {
      try {
        const data = await getCommentByDocumentId(docId);
        setComments(data);

        const userIds = [...new Set(data.map(c => c.idUser))];
        const userResults = await Promise.all(
          userIds.map(async (uid) => {
            try {
              const user = await getUserById(uid);
              return [uid, user.fullName];
            } catch {
              return [uid, "Ẩn danh"];
            }
          })
        );
        setUserMap(Object.fromEntries(userResults));
      } catch {
        setComments([]);
        setUserMap({});
      }
    }

    fetchCommentsAndUsers();
  }, [docId]);

  const rootComments = comments.filter(c => !c.toReply);
  const getReplies = (parentId) => comments.filter(c => c.toReply === parentId);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    setLoading(true);
    try {
      await postComment({
        docId,
        content: newComment,
        toReply: null,
        idUser: userId,
      });
      setNewComment("");
      window.location.reload(); // reload để lấy lại data mới
    } catch (err) {
      alert("Lỗi khi gửi bình luận: " + (err.message || JSON.stringify(err)));
    }
    setLoading(false);
  };

  const handleReplySubmit = async () => {
    if (!replyContent.trim()) return alert("Vui lòng nhập nội dung trả lời");
    setReplyLoading(true);
    try {
      await postComment({
        docId,
        content: replyContent,
        toReply: replyToId,
        idUser: userId,
      });
      setReplyToId(null);
      setReplyContent("");
      window.location.reload();
    } catch (err) {
      alert("Lỗi khi gửi trả lời: " + (err.message || JSON.stringify(err)));
    }
    setReplyLoading(false);
  };

  const CommentItem = ({ comment }) => {
    const replies = getReplies(comment._id);
    const username = userMap[comment.idUser] || "Ẩn danh";

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
                  if (replyToId === comment._id) {
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

            {replyToId === comment._id && (
              <div className="mt-3">
                <textarea
                  rows={2}
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Nhập trả lời..."
                  value={replyContent}
                  onChange={e => setReplyContent(e.target.value)}
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

          {/* Hiển thị các reply 1 cấp */}
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
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Bình luận ({comments.length})
      </h2>

      <div className="bg-gray-50 rounded-lg p-4 mb-6 border">
        <div className="flex items-start">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-3">
            <i className="fas fa-user" />
          </div>
          <div className="flex-1">
            <textarea
              className="w-full px-3 py-2 border rounded"
              rows={3}
              placeholder="Viết bình luận..."
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              disabled={loading}
            />
            <div className="flex justify-end mt-2">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Đang gửi..." : "Đăng bình luận"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {rootComments.length > 0 ? (
          rootComments.map(comment => (
            <CommentItem key={comment._id} comment={comment} />
          ))
        ) : (
          <p className="text-gray-500">Chưa có bình luận nào.</p>
        )}
      </div>
    </div>
  );
}

export default CommentBox;
