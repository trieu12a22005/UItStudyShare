import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCommentByDocumentId, getUserById, postComment } from "../Service/DocumentService";
import CommentItem from "./CommentItem ";

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
      window.location.reload(); // hoặc gọi lại fetchCommentsAndUsers()
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
      window.location.reload(); // hoặc gọi lại fetchCommentsAndUsers()
    } catch (err) {
      alert("Lỗi khi gửi trả lời: " + (err.message || JSON.stringify(err)));
    }
    setReplyLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Bình luận ({comments.length})</h2>

      {/* Ô nhập bình luận mới */}
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

      {/* Danh sách bình luận */}
      <div className="space-y-4">
        {rootComments.length > 0 ? (
          rootComments.map(comment => (
            <CommentItem
              key={comment._id}
              comment={comment}
              userMap={userMap}
              replies={getReplies(comment._id)}
              replyToId={replyToId}
              setReplyToId={setReplyToId}
              replyContent={replyContent}
              setReplyContent={setReplyContent}
              handleReplySubmit={handleReplySubmit}
            />
          ))
        ) : (
          <p className="text-gray-500">Chưa có bình luận nào.</p>
        )}
      </div>
    </div>
  );
}

export default CommentBox;
