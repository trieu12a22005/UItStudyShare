// import React from 'react';

// function CommentBox()
// {
//   return (
//     <>
//     <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Bình luận (12)</h2>
//             {/* Comment Form */}
//             <div className="comment-box bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
//               <div className="flex items-start">
//                 <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
//                   <i className="fas fa-user" />
//                 </div>
//                 <div className="flex-1">
//                   <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Viết bình luận của bạn..." defaultValue={""} />
//                   <div className="flex justify-between items-center mt-2">
//                     <div className="flex space-x-2">
//                       <button className="text-gray-500 hover:text-blue-500">
//                         <i className="fas fa-paperclip" />
//                       </button>
//                       <button className="text-gray-500 hover:text-blue-500">
//                         <i className="fas fa-smile" />
//                       </button>
//                     </div>
//                     <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
//                       Đăng bình luận
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* Comment List */}
//             <div className="space-y-4">
//               {/* Comment 1 */}
//               <div className="flex items-start">
//                 <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
//                   <i className="fas fa-user-graduate" />
//                 </div>
//                 <div className="flex-1">
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <div className="flex justify-between items-start mb-2">
//                       <div>
//                         <h4 className="font-medium text-gray-800">Trần Văn B</h4>
//                         <span className="text-xs text-gray-500">2 ngày trước</span>
//                       </div>
//                       <div className="flex items-center text-yellow-400 text-sm">
//                         <i className="fas fa-star" />
//                         <i className="fas fa-star" />
//                         <i className="fas fa-star" />
//                         <i className="fas fa-star" />
//                         <i className="fas fa-star" />
//                       </div>
//                     </div>
//                     <p className="text-gray-700">Tài liệu rất chi tiết và dễ hiểu. Cảm ơn tác giả đã
//                       chia sẻ!</p>
//                     <div className="flex space-x-4 mt-3 text-sm text-gray-500">
//                       <button className="hover:text-blue-600 flex items-center">
//                         <i className="far fa-thumbs-up mr-1" /> 5
//                       </button>
//                       <button className="hover:text-blue-600 flex items-center">
//                         <i className="far fa-thumbs-down mr-1" /> 0
//                       </button>
//                       <button className="hover:text-blue-600">
//                         Trả lời
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {/* Comment 2 */}
//               <div className="flex items-start">
//                 <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
//                   <i className="fas fa-user-tie" />
//                 </div>
//                 <div className="flex-1">
//                   <div className="bg-gray-50 rounded-lg p-4">
//                     <div className="flex justify-between items-start mb-2">
//                       <div>
//                         <h4 className="font-medium text-gray-800">Lê Thị C</h4>
//                         <span className="text-xs text-gray-500">1 tuần trước</span>
//                       </div>
//                       <div className="flex items-center text-yellow-400 text-sm">
//                         <i className="fas fa-star" />
//                         <i className="fas fa-star" />
//                         <i className="fas fa-star" />
//                         <i className="fas fa-star" />
//                         <i className="fas fa-star-half-alt" />
//                       </div>
//                     </div>
//                     <p className="text-gray-700">Slide trình bày đẹp, nội dung đầy đủ. Tuy nhiên phần ví
//                       dụ có thể thêm nhiều hơn nữa.</p>
//                     <div className="flex space-x-4 mt-3 text-sm text-gray-500">
//                       <button className="hover:text-blue-600 flex items-center">
//                         <i className="far fa-thumbs-up mr-1" /> 3
//                       </button>
//                       <button className="hover:text-blue-600 flex items-center">
//                         <i className="far fa-thumbs-down mr-1" /> 1
//                       </button>
//                       <button className="hover:text-blue-600">
//                         Trả lời
//                       </button>
//                     </div>
//                     {/* Reply */}
//                     <div className="mt-4 pl-4 border-l-2 border-gray-200">
//                       <div className="flex items-start mt-3">
//                         <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
//                           <i className="fas fa-user text-sm" />
//                         </div>
//                         <div className="flex-1">
//                           <div className="bg-gray-50 rounded-lg p-3">
//                             <div className="flex justify-between items-start mb-1">
//                               <div>
//                                 <h4 className="font-medium text-gray-800 text-sm">Nguyễn Văn
//                                   A</h4>
//                                 <span className="text-xs text-gray-500">Tác giả • 6 ngày
//                                   trước</span>
//                               </div>
//                             </div>
//                             <p className="text-gray-700 text-sm">Cảm ơn góp ý của bạn. Mình sẽ
//                               bổ sung thêm ví dụ trong phiên bản cập nhật.</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//     </>
//   )
// }

// export default CommentBox;
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Lấy param từ URL
import { getCommentByDocumentId } from "../Service/DocumentService";
import { getUserById } from "../Service/DocumentService"; 
function CommentBox({ token, userId }) {
  const { id: docId } = useParams(); // Lấy id document từ URL param  
  const [comments, setComments] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

useEffect(() => {
  if (!docId) {
    setComments([]);
    return;
  }

  getCommentByDocumentId(docId)
    .then(async (data) => {
      setComments(data);

      const userIds = [...new Set(data.map((c) => c.idUser))];
      // console.log("📌 userIds:", userIds); // ✅ Debug xem có đúng danh sách ID không

      const userResults = await Promise.all(
        userIds.map((uid) =>
          getUserById(uid)
            .then(user => {
              // console.log(`✅ Fetched user for ${uid}:`, user); // ✅ In ra user thật
              return [uid, user.fullName];
            })
            .catch((e) => {
              console.warn(`❌ Failed to fetch user ${uid}`, e);
              return [uid, "Ẩn danh"];
            })
        )
      );

      const userMapObj = Object.fromEntries(userResults);
      // console.log("📦 userMapObj:", userMapObj); // ✅ Xem dữ liệu cuối
      setUserMap(userMapObj);
    })
    .catch((err) => {
      console.error("❌ Lỗi khi load comment:", err);
      setComments([]);
      setUserMap({});
    });
}, [docId]);



  // Lọc bình luận gốc (không reply)
  const rootComments = comments.filter((c) => !c.toReply);

  // Lấy reply theo parentId
  const getReplies = (parentId) =>
    comments.filter((c) => c.toReply === parentId);

  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/comments/${docId}/doc/create/null/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: newComment,
          toReply: null,
          idUser: userId,
        }),
      });
      if (res.ok) {
        const created = await res.json();
        setComments([created, ...comments]);
        setNewComment("");
      } else {
      const err = await res.json();
      alert("Lỗi khi gửi bình luận: " + (err.message || JSON.stringify(err)));
      }
    } catch {
      alert("Lỗi kết nối");
    }
    setLoading(false);
  };

  const CommentItem = ({ comment }) => {
    const replies = getReplies(comment._id);

    return (
      <div className="flex items-start mt-4" key={comment._id}>
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
          <i className="fas fa-user" />
        </div>
        <div className="flex-1">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-medium text-gray-800">
  {userMap[comment.idUser] || "Ẩn danh"}
</h4>

                <span className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
              {/* Star rating placeholder - bạn có thể bổ sung rating thực tế */}
              <div className="flex items-center text-yellow-400 text-sm">
                {[...Array(5)].map((_, i) => (
                  <i key={i} className="fas fa-star" />
                ))}
              </div>
            </div>
            <p className="text-gray-700">{comment.content}</p>

            {/* Nút Like, Dislike, Trả lời */}
            <div className="flex space-x-4 mt-3 text-sm text-gray-500">
              <button className="hover:text-blue-600 flex items-center" type="button">
                <i className="far fa-thumbs-up mr-1" /> 0
              </button>
              <button className="hover:text-blue-600 flex items-center" type="button">
                <i className="far fa-thumbs-down mr-1" /> 0
              </button>
              <button className="hover:text-blue-600" type="button">
                Trả lời
              </button>
            </div>
          </div>

          {/* Reply */}
          {replies.length > 0 && (
            <div className="mt-4 pl-4 border-l-2 border-gray-200">
              {replies.map((r) => (
                <div className="flex items-start mt-3" key={r._id}>
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                    <i className="fas fa-user text-sm" />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <h4 className="font-medium text-gray-800 text-sm">
  {userMap[r.idUser] || "Ẩn danh"}
</h4>

                          <span className="text-xs text-gray-500">
                            {/* Nếu bạn có role, ví dụ tác giả thì hiển thị */}
                            {/* r.role === "author" ? "Tác giả • " : "" */}
                            {new Date(r.createdAt).toLocaleDateString("vi-VN")}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">{r.content}</p>
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

      {/* Comment Form */}
      <div className="comment-box bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
        <div className="flex items-start">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
            <i className="fas fa-user" />
          </div>
          <div className="flex-1">
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              placeholder="Viết bình luận của bạn..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={loading}
            />
            <div className="flex justify-between items-center mt-2">
              <div className="flex space-x-2">
                <button className="text-gray-500 hover:text-blue-500" type="button">
                  <i className="fas fa-paperclip" />
                </button>
                <button className="text-gray-500 hover:text-blue-500" type="button">
                  <i className="fas fa-smile" />
                </button>
              </div>
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Đang gửi..." : "Đăng bình luận"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comment List */}
      <div className="space-y-4">
        {rootComments.length > 0 ? (
          rootComments.map((comment) => (
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

