

function AuthorInfo()
{
    return (
        <>
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tác giả</h2>
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                <i className="fas fa-user-graduate text-2xl" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Nguyễn Văn A</h3>
                <p className="text-sm text-gray-600">Giáo viên Toán</p>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <i className="fas fa-star text-yellow-400 mr-1" />
                  <span>4.8 (56 đánh giá)</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-sm mb-4">Giáo viên với 10 năm kinh nghiệm giảng dạy môn Toán tại
              các trường đại học. Đã xuất bản nhiều tài liệu tham khảo cho sinh viên.</p>
            <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium">
              <i className="fas fa-book-open mr-2" /> Xem tất cả tài liệu
            </button>
          </div>
        </>
    )
}

export default AuthorInfo;