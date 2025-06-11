import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCommentByType,
  getUserById,
  postComment,
} from "../Service/DocumentService";
import CommentItem from "./CommentItem";

function CommentBox({ token, userId, id: propId, type = "doc", onCommentPosted }) {

  const { id: routeId } = useParams();
  const id = propId || routeId;
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
    
  const fetchCommentsAndUsers = async () => {
    try {
      const data = await getCommentByType(id);
      setComments(data);

      const userIds = [...new Set(data.map((c) => c.idUser))];
      const userResults = await Promise.all(
        userIds.map(async (uid) => {
          try {
            const user = await getUserById(uid);
            return [uid, { name: user.fullName, avatar: user.avatar }];
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
  };
useEffect(() => {
  if (!userId) return;
  const fetchCurrentUser = async () => {
    try {
      const userInfo = await getUserById(userId);
      setUser(userInfo);
    } catch (err) {
      console.error("Lỗi lấy thông tin user hiện tại:", err);
      setUser(null); // fallback về null nếu lỗi
    }
  };
  fetchCurrentUser();
}, [userId]);
console.log("user:", user);
  useEffect(() => {
    if (id) fetchCommentsAndUsers();
  }, [id, type]);

  const getReplies = (parentId) =>
    comments.filter((c) => c.toReply === parentId);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    setLoading(true);
    try {
      await postComment({
        [type === "doc" ? "docId" : "postId"]: id,
        content: newComment,
        toReply: null,
        idUser: userId,
      });
      setNewComment("");
      await fetchCommentsAndUsers();

      // ✅ Gọi callback sau khi bình luận thành công
      if (onCommentPosted) onCommentPosted();
    } catch {
      alert("Lỗi khi gửi bình luận");
    }
    setLoading(false);
  };


  const handleReplySubmit = async (parentId, replyContent) => {
    await postComment({
      [type === "doc" ? "docId" : "postId"]: id,
      content: replyContent,
      toReply: parentId,
      idUser: userId,
    });
    await fetchCommentsAndUsers();

    // ✅ Gọi callback để tăng commentsCount
    if (onCommentPosted) onCommentPosted();
  };


  const rootComments = comments.filter((c) => !c.toReply);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Bình luận ({comments.length})
      </h2>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
  {user?.avatar ? (
    <img
      src={user.avatar}
      alt={user.fullName || "avatar"}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full bg-blue-100 text-blue-600 flex items-center justify-center">
      <i className="fas fa-user" />
    </div>
  )}
</div>

          <div className="flex-1">
            <textarea
              className="w-full px-3 py-2 rounded"
              rows={3}
              placeholder="Viết bình luận..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
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
          rootComments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={{
                ...comment,
                isOwn: String(comment.idUser) === String(userId),
                token,
                toId: id,
                type,
              }}
              userMap={userMap}
              getReplies={getReplies}
              onSubmitReply={handleReplySubmit}
              onRefresh={fetchCommentsAndUsers}
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
