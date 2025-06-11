import moment from "moment";
import { useEffect, useState } from "react";
import { getUserById } from "../Service/DocumentService";

function PostCard({ post }) {
  const tags = Array.isArray(post.tags) ? post.tags : [];
  const [uploaderName, setUploaderName] = useState(post.fullNameAuthor || "Ẩn danh");

  useEffect(() => {
    // Nếu fullNameAuthor không có, gọi API để lấy
    if (!post.fullNameAuthor && post.author) {
      getUserById(post.author)
        .then((user) => {
          setUploaderName(user.fullName || "Ẩn danh");
        })
        .catch(() => {
          setUploaderName("Ẩn danh");
        });
    }
  }, [post.author]);

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden post-card transition duration-300">
      <div className="p-4">
        <div className="flex items-start">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src={post.avatarAuthor || "https://i.pravatar.cc/150"}
            alt="Avatar"
          />
          <div className="ml-4 flex-1">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">{uploaderName}</span>
                <span className="text-gray-500 text-sm ml-2">
                  {post.createdAt
                    ? moment(post.createdAt).format("HH:mm DD/MM/YYYY")
                    : "Không rõ thời gian"}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <i className="fas fa-comment-alt mr-1" /> {post.commentsCount || 0}
              </div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mt-1">{post.title}</h3>
            <p className="text-gray-600 mt-2">{post.content}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag, index) => (
                <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-t border-gray-100">
        <div className="flex space-x-4">
          <button className="flex items-center text-gray-500 hover:text-indigo-600">
            <i className="far fa-thumbs-up mr-1" /> {post.likesCount || 0}
          </button>
          <button className="flex items-center text-gray-500 hover:text-indigo-600">
            <i className="far fa-comment mr-1" /> Bình luận
          </button>
        </div>
        <button className="text-gray-400 hover:text-indigo-600">
          <i className="fas fa-ellipsis-h" />
        </button>
      </div>
    </div>
  );
}

export default PostCard;
