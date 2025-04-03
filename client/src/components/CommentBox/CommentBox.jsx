import React from 'react';

function CommentBox()
{
  return (
    <>
    <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Bình luận (12)</h2>
            {/* Comment Form */}
            <div className="comment-box bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  <i className="fas fa-user" />
                </div>
                <div className="flex-1">
                  <textarea className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" rows={3} placeholder="Viết bình luận của bạn..." defaultValue={""} />
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex space-x-2">
                      <button className="text-gray-500 hover:text-blue-500">
                        <i className="fas fa-paperclip" />
                      </button>
                      <button className="text-gray-500 hover:text-blue-500">
                        <i className="fas fa-smile" />
                      </button>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
                      Đăng bình luận
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Comment List */}
            <div className="space-y-4">
              {/* Comment 1 */}
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                  <i className="fas fa-user-graduate" />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-800">Trần Văn B</h4>
                        <span className="text-xs text-gray-500">2 ngày trước</span>
                      </div>
                      <div className="flex items-center text-yellow-400 text-sm">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                      </div>
                    </div>
                    <p className="text-gray-700">Tài liệu rất chi tiết và dễ hiểu. Cảm ơn tác giả đã
                      chia sẻ!</p>
                    <div className="flex space-x-4 mt-3 text-sm text-gray-500">
                      <button className="hover:text-blue-600 flex items-center">
                        <i className="far fa-thumbs-up mr-1" /> 5
                      </button>
                      <button className="hover:text-blue-600 flex items-center">
                        <i className="far fa-thumbs-down mr-1" /> 0
                      </button>
                      <button className="hover:text-blue-600">
                        Trả lời
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* Comment 2 */}
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                  <i className="fas fa-user-tie" />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium text-gray-800">Lê Thị C</h4>
                        <span className="text-xs text-gray-500">1 tuần trước</span>
                      </div>
                      <div className="flex items-center text-yellow-400 text-sm">
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star" />
                        <i className="fas fa-star-half-alt" />
                      </div>
                    </div>
                    <p className="text-gray-700">Slide trình bày đẹp, nội dung đầy đủ. Tuy nhiên phần ví
                      dụ có thể thêm nhiều hơn nữa.</p>
                    <div className="flex space-x-4 mt-3 text-sm text-gray-500">
                      <button className="hover:text-blue-600 flex items-center">
                        <i className="far fa-thumbs-up mr-1" /> 3
                      </button>
                      <button className="hover:text-blue-600 flex items-center">
                        <i className="far fa-thumbs-down mr-1" /> 1
                      </button>
                      <button className="hover:text-blue-600">
                        Trả lời
                      </button>
                    </div>
                    {/* Reply */}
                    <div className="mt-4 pl-4 border-l-2 border-gray-200">
                      <div className="flex items-start mt-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-2">
                          <i className="fas fa-user text-sm" />
                        </div>
                        <div className="flex-1">
                          <div className="bg-gray-50 rounded-lg p-3">
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <h4 className="font-medium text-gray-800 text-sm">Nguyễn Văn
                                  A</h4>
                                <span className="text-xs text-gray-500">Tác giả • 6 ngày
                                  trước</span>
                              </div>
                            </div>
                            <p className="text-gray-700 text-sm">Cảm ơn góp ý của bạn. Mình sẽ
                              bổ sung thêm ví dụ trong phiên bản cập nhật.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default CommentBox;
