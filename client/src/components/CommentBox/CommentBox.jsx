import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getCommentByDocumentId,
  getUserById,
  postComment,
} from "../Service/DocumentService";
import CommentItem from "./CommentItem"; // ✅ sử dụng file bạn đã tách

function CommentBox({ token, userId }) {
  const { id: docId } = useParams();
  const [comments, setComments] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCommentsAndUsers = async () => {
    try {
      const data = await getCommentByDocumentId(docId);
      setComments(data);

      const userIds = [...new Set(data.map((c) => c.idUser))];
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
  };

  useEffect(() => {
    if (docId) fetchCommentsAndUsers();
  }, [docId]);

  const getReplies = (parentId) =>
    comments.filter((c) => c.toReply === parentId);

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
      await fetchCommentsAndUsers();
    } catch (err) {
      alert("Lỗi khi gửi bình luận");
    }
    setLoading(false);
  };

  const handleReplySubmit = async (parentId, replyContent) => {
    await postComment({
      docId,
      content: replyContent,
      toReply: parentId,
      idUser: userId,
    });
    await fetchCommentsAndUsers();
  };

  const rootComments = comments.filter((c) => !c.toReply);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Bình luận ({comments.length})
      </h2>

      {/* Viết bình luận mới */}
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

      {/* Danh sách bình luận gốc */}
      <div className="space-y-4">
        {rootComments.length > 0 ? (
          rootComments.map((comment) => (
            <CommentItem
              key={comment._id}
              comment={comment}
              userMap={userMap}
              getReplies={getReplies}
              onSubmitReply={handleReplySubmit}
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
