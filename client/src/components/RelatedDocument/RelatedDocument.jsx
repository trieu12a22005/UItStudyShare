

function RelatedDocument()
{
    return (
        <>
        
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Tài liệu liên quan</h2>
            <div className="space-y-4">
              {/* Related Doc 1 */}
              <a href="#" className="block related-doc bg-gray-50 hover:bg-white rounded-lg p-4 border border-gray-200 transition-all duration-300">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                    <i className="fas fa-file-pdf" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm mb-1">Bài giảng Toán cao cấp -
                      Chương 2</h4>
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="mr-2"><i className="fas fa-download mr-1" /> 98</span>
                      <span><i className="fas fa-star text-yellow-400 mr-1" /> 4.6</span>
                    </div>
                  </div>
                </div>
              </a>
              {/* Related Doc 2 */}
              <a href="#" className="block related-doc bg-gray-50 hover:bg-white rounded-lg p-4 border border-gray-200 transition-all duration-300">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600 mr-3">
                    <i className="fas fa-file-word" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm mb-1">Bài tập Toán cao cấp có lời
                      giải</h4>
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="mr-2"><i className="fas fa-download mr-1" /> 156</span>
                      <span><i className="fas fa-star text-yellow-400 mr-1" /> 4.9</span>
                    </div>
                  </div>
                </div>
              </a>
              {/* Related Doc 3 */}
              <a href="#" className="block related-doc bg-gray-50 hover:bg-white rounded-lg p-4 border border-gray-200 transition-all duration-300">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600 mr-3">
                    <i className="fas fa-file-pdf" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 text-sm mb-1">Đề thi Toán cao cấp giữa kỳ
                      2023</h4>
                    <div className="flex items-center text-xs text-gray-500">
                      <span className="mr-2"><i className="fas fa-download mr-1" /> 210</span>
                      <span><i className="fas fa-star text-yellow-400 mr-1" /> 4.7</span>
                    </div>
                  </div>
                </div>
              </a>
              <button className="w-full py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium mt-4">
                <i className="fas fa-chevron-down mr-2" /> Xem thêm
              </button>
            </div>
          </div>
        </>
    )
}
export default RelatedDocument;