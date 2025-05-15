import React from 'react';
import  './style.css'
function Home() {
  return (
    <div>
      <div className="uit-all">
        <div className="uit-container">
          <div className="uit-left">
            <h1 className="uit-title">
              Nền tảng chia sẻ tài liệu học tập hàng đầu cho sinh viên UIT!
            </h1>
            <p className="uit-subtitle">
              Tìm kiếm, chia sẻ và học hỏi với hàng ngàn tài liệu miễn phí từ
              cộng đồng
            </p>
            <div className="uit-buttons">
              <button className="uit-btn uit-btn-white">
                Khám phá tài liệu
              </button>
              <button className="uit-btn uit-btn-blue">Tham gia ngay</button>
            </div>
          </div>

          <div className="uit-right">
            <img
              src="123.jpg"
              alt="Sinh viên học tập"
              className="uit-image"
            />
          </div>
        </div>
      </div>
      <div className="phan-4">
        <div className="container">
          <div className="row">
            <div className="inn-box">
              <div className="col-xl-3">
                <img
                  src="https://img.pikbest.com/png-images/20241127/book-open-icon-vector-silhouette-art-design_11140366.png!w700wp"
                  alt="Kho tài liệu đa dạng"
                />
                <div className="title">KHO TÀI LIỆU ĐA DẠNG</div>
                <p>TỔNG HỢP NHIỀU TÀI LIỆU CHO MỌI HỌC PHẦN UIT</p>
              </div>
              <div className="col-xl-3">
                <img
                  src="https://png.pngtree.com/png-clipart/20250104/original/pngtree-people-icon-business-corporate-team-working-social-network-group-logo-symbol-png-image_3985466.png"
                  alt="Cộng đồng học tập"
                />
                <div className="title">CỘNG ĐỒNG HỌC TẬP SÔI ĐỘNG</div>
                <p>TRAO ĐỔI, THẢO LUẬN DỄ DÀNG</p>
              </div>
              <div className="col-xl-3">
                <img
                  src="https://pethouse.com.vn/wp-content/uploads/2022/07/thuan-chung-100-phan-tram.png"
                  alt="Tìm kiếm nhanh"
                />
                <div className="title">TÌM KIẾM NHANH CHÓNG</div>
                <p>TÌM TÀI LIỆU THEO MÔN HỌC</p>
              </div>
              <div className="col-xl-3">
                <img
                  src="https://img.lovepik.com/png/20231007/Network-technology-security-logo-identification-circle-lock_117489_wh1200.png"
                  alt="Bảo mật"
                />
                <div className="title">ĐĂNG NHẬP BẢO MẬT</div>
                <p>ĐẢM BẢO QUYỀN RIÊNG TƯ</p>
              </div>
              
            </div>
             
          </div>
          
        </div>
       <section className="my-10">
  <div className="flex justify-center">
    <a
      href="#"
      className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300"
    >
      Đóng góp tài liệu – Gieo mầm tri thức cho thế hệ tiếp theo!
    </a>
  </div>
</section>
      </div>

     <footer className="bg-gray-800 text-white py-4">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-lg font-bold mb-4 flex items-center">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white mr-2">
            <i className="fas fa-book-open" />
          </div>
          UIT Share
        </h3>
        <p className="text-gray-400 text-sm">Nền tảng chia sẻ tài liệu học tập cho giáo viên và sinh viên Việt
          Nam.</p>
      </div>
      <div>
        <h4 className="text-md font-semibold mb-4">Liên kết</h4>
        <ul className="space-y-2">
          <li><a href="#" className="text-gray-400 hover:text-white text-sm">Trang chủ</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white text-sm">Tài liệu</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white text-sm">Lớp học</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white text-sm">Thảo luận</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-md font-semibold mb-4">Hỗ trợ</h4>
        <ul className="space-y-2">
          <li><a href="#" className="text-gray-400 hover:text-white text-sm">Trợ giúp</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white text-sm">Điều khoản</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white text-sm">Bảo mật</a></li>
          <li><a href="#" className="text-gray-400 hover:text-white text-sm">Liên hệ</a></li>
        </ul>
      </div>
      <div>
        <h4 className="text-md font-semibold mb-4">Kết nối</h4>
        <div className="flex space-x-4 mb-4">
          <a href="#" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-blue-600 flex items-center justify-center">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-blue-400 flex items-center justify-center">
            <i className="fab fa-twitter" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-red-600 flex items-center justify-center">
            <i className="fab fa-youtube" />
          </a>
          <a href="#" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-purple-600 flex items-center justify-center">
            <i className="fab fa-instagram" />
          </a>
        </div>
        <p className="text-gray-400 text-sm">Email: support@uitshare.vn</p>
      </div>
    </div>
    <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
      <p>© 2023 UITShare. Bảo lưu mọi quyền.</p>
    </div>
  </div>
</footer>
  
    </div>
  );
}

export default Home;
