import { useEffect } from "react";
import { Heart, MessageCircle, Eye, CalendarDays, X } from "lucide-react";
import CommentBox from "../CommentBox/CommentBox"; // ✅ import component CommentBox dùng chung

export default function DetailPost({ post, onClose, userId, token }) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white max-w-4xl w-full p-6 rounded-xl relative overflow-y-auto max-h-[90vh]">
                <button className="absolute top-4 right-4" onClick={onClose}>
                    <X />
                </button>

                {/* Tác giả + Avatar */}
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

                {/* Tiêu đề */}
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>

                {/* Ảnh (nhiều ảnh nếu có) */}
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

                {/* Nội dung */}
                <p className="mb-4 text-gray-800 whitespace-pre-line">{post.content}</p>

                {/* Like & Comment Count */}
                <div className="flex items-center gap-4 text-gray-600 border-t pt-4 mb-4">
                    <div className="flex items-center gap-1">
                        <Heart className="w-5 h-5" /> <span>{post.likesCount ?? 0} Likes</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageCircle className="w-5 h-5" /> <span>{post.commentsCount ?? 0} Comments</span>
                    </div>
                </div>

                {/* ✅ CommentBox dùng chung */}
                <CommentBox
                    id={post._id}
                    type="post"
                    userId={userId}
                    token={token}
                />
            </div>
        </div>
    );
}
