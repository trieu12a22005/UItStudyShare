import { useEffect, useState } from "react";
import { Heart, MessageCircle, Eye, CalendarDays, X } from "lucide-react";
import CommentBox from "../CommentBox/CommentBox";
import { toggleLikePost } from "../Service/PostService";

export default function DetailPost({ post, onClose, userId, token, onLikeUpdate, onCommentUpdate }) {
  const [likesCount, setLikesCount] = useState(post.likesCount ?? 0);

  // ✅ Tính trạng thái liked theo danh sách idUser
  const isLiked = post.likes?.some((l) => l.idUser === userId);
const [commentsCount, setCommentsCount] = useState(post.commentsCount ?? 0);

const handleNewComment = () => {
  setCommentsCount((prev) => prev + 1);
  onCommentUpdate?.(post._id); // nếu muốn sync lên cha nữa
};

  const handleToggleLike = async () => {
    try {
      const res = await toggleLikePost(post._id, userId, token);
      const { liked, likesCount } = res;
      setLikesCount(likesCount);

      // ✅ Gọi ngược về PostList để cập nhật danh sách bài viết
      if (onLikeUpdate) {
        onLikeUpdate(post._id, liked, likesCount);
      }
    } catch (error) {
      console.error("Lỗi like:", error.message);
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-4xl w-full p-6 rounded-xl relative overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="absolute top-4 right-4" onClick={onClose}>
          <X />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <img
            src={post.avatar || "https://via.placeholder.com/40"}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">{post.author}</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CalendarDays className="w-4 h-4" /> {post.date}
              <Eye className="w-4 h-4 ml-4" /> {post.views} lượt xem
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">{post.title}</h2>

        {post.images?.length > 0 && (
          <div className="space-y-3 mb-4">
            {post.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`media-${i}`}
                className="rounded-lg object-cover w-full max-h-80"
              />
            ))}
          </div>
        )}

        <p className="mb-4 text-gray-800 whitespace-pre-line">{post.content}</p>

        <div className="flex items-center gap-4 text-gray-600 border-t pt-4 mb-4">
          <div
            className={`flex items-center gap-1 cursor-pointer select-none ${
              isLiked ? "text-red-500" : "text-gray-500"
            }`}
            onClick={handleToggleLike}
          >
            <Heart className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} />
            <span>{likesCount} Likes</span>
          </div>

          <div className="flex items-center gap-1">
            <MessageCircle className="w-5 h-5" />
           <span>{commentsCount} Comments</span>
          </div>
        </div>

       <CommentBox
  id={post._id}
  type="post"
  userId={userId}
  token={token}
  onCommentPosted={handleNewComment}
/>

      </div>
    </div>
  );
}
