

// function Statistics()
// {
//    const {
//     views,
//     downloadCount,
//     countRatings
//   } = document;
//     return (
//         <>
        
//         <div className="bg-white rounded-xl shadow-sm p-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">Thống kê</h2>
//             <div className="space-y-3">
//               <div>
//                 <div className="flex justify-between text-sm text-gray-600 mb-1">
//                   <span>Lượt xem</span>
//                   <span>356</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-1.5">
//                   <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '75%' }} />
//                 </div>
//               </div>
//               <div>
//                 <div className="flex justify-between text-sm text-gray-600 mb-1">
//                   <span>Lượt tải</span>
//                   <span>124</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-1.5">
//                   <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '45%' }} />
//                 </div>
//               </div>
//               <div>
//                 <div className="flex justify-between text-sm text-gray-600 mb-1">
//                   <span>Đánh giá</span>
//                   <span>28</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-1.5">
//                   <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: '30%' }} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </>
//     )
// }
// export default Statistics;




import PropTypes from 'prop-types';

function Statistics({ document }) {
  const {
    views = 0,
    downloadCount = 0,
    countRatings = 0
  } = document || {};

  // Optional: Tính % tương đối cho progress bar
  const total = views || 1;
  const percentViews = (views / total) * 100;
  const percentDownloads = (downloadCount / total) * 100;
  const percentRatings = (countRatings / total) * 100;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Thống kê</h2>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Lượt xem</span>
            <span>{views}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${percentViews}%` }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Lượt tải</span>
            <span>{downloadCount}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${percentDownloads}%` }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Đánh giá</span>
            <span>{countRatings}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: `${percentRatings}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

Statistics.propTypes = {
  document: PropTypes.shape({
    views: PropTypes.number,
    downloadCount: PropTypes.number,
    countRatings: PropTypes.number,
  }).isRequired,
};

export default Statistics;
