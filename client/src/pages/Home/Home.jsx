import React from "react";
import "./style.css";

function Home() {
  return (
    <div>
      {/* Phần header nền xanh phủ full chiều ngang */}
      <div className="uit-all w-full bg-blue-600 py-12">
        <div className="uit-container max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start px-4 md:px-16 gap-8">
          <div className="uit-left flex-1 text-white">
            <h1 className="uit-title text-3xl md:text-5xl font-bold leading-tight mb-6">
              Nền tảng chia sẻ tài liệu học tập hàng đầu cho sinh viên UIT!
            </h1>
            <p className="uit-subtitle text-lg md:text-xl">
              Tìm kiếm, chia sẻ và học hỏi với hàng ngàn tài liệu miễn phí từ cộng đồng
            </p>
            <div className="uit-buttons flex flex-col sm:flex-row gap-4 mt-8">
              <button className="uit-btn uit-btn-white px-6 py-3 rounded-md font-semibold shadow-md hover:shadow-lg transition">
                Khám phá tài liệu
              </button>
              <button className="uit-btn uit-btn-blue px-6 py-3 rounded-md font-semibold shadow-md hover:shadow-lg transition">
                Tham gia ngay
              </button>
            </div>
          </div>

          <div className="uit-right flex-1 flex justify-center">
            <img
              src="123.jpg"
              alt="Sinh viên học tập"
              className="uit-image max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Phần giới thiệu tính năng */}
      <div className="phan-4 bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center p-4">
            <img
              src="https://img.pikbest.com/png-images/20241127/book-open-icon-vector-silhouette-art-design_11140366.png!w700wp"
              alt="Kho tài liệu đa dạng"
              className="mx-auto mb-4 w-20 h-20 object-contain"
            />
            <div className="title font-semibold text-lg mb-2">KHO TÀI LIỆU ĐA DẠNG</div>
            <p className="text-gray-600">TỔNG HỢP NHIỀU TÀI LIỆU CHO MỌI HỌC PHẦN UIT</p>
          </div>

          <div className="text-center p-4">
            <img
              src="https://png.pngtree.com/png-clipart/20250104/original/pngtree-people-icon-business-corporate-team-working-social-network-group-logo-symbol-png-image_3985466.png"
              alt="Cộng đồng học tập"
              className="mx-auto mb-4 w-20 h-20 object-contain"
            />
            <div className="title font-semibold text-lg mb-2">CỘNG ĐỒNG HỌC TẬP SÔI ĐỘNG</div>
            <p className="text-gray-600">TRAO ĐỔI, THẢO LUẬN DỄ DÀNG</p>
          </div>

          <div className="text-center p-4">
            <img
              src="https://pethouse.com.vn/wp-content/uploads/2022/07/thuan-chung-100-phan-tram.png"
              alt="Tìm kiếm nhanh"
              className="mx-auto mb-4 w-20 h-20 object-contain"
            />
            <div className="title font-semibold text-lg mb-2">TÌM KIẾM NHANH CHÓNG</div>
            <p className="text-gray-600">TÌM TÀI LIỆU THEO MÔN HỌC</p>
          </div>

          <div className="text-center p-4">
            <img
              src="https://img.lovepik.com/png/20231007/Network-technology-security-logo-identification-circle-lock_117489_wh1200.png"
              alt="Bảo mật"
              className="mx-auto mb-4 w-20 h-20 object-contain"
            />
            <div className="title font-semibold text-lg mb-2">ĐĂNG NHẬP BẢO MẬT</div>
            <p className="text-gray-600">ĐẢM BẢO QUYỀN RIÊNG TƯ</p>
          </div>
        </div>

        <section className="my-10 flex justify-center">
          <a
            href="#"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full transition duration-300 max-w-md text-center"
          >
            Đóng góp tài liệu – Gieo mầm tri thức cho thế hệ tiếp theo!
          </a>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white mr-2">
                <i className="fas fa-book-open" />
              </div>
              UIT Share
            </h3>
            <p className="text-gray-400 text-sm">
              Nền tảng chia sẻ tài liệu học tập cho giáo viên và sinh viên Việt Nam.
            </p>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-4">Liên kết</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Tài liệu
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Lớp học
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Thảo luận
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Trợ giúp
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Điều khoản
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Bảo mật
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white text-sm">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-4">Kết nối</h4>
            <div className="flex space-x-4 mb-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-700 hover:bg-blue-600 flex items-center justify-center"
              >
                <i className="fab fa-facebook-f" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-700 hover:bg-blue-400 flex items-center justify-center"
              >
                <i className="fab fa-twitter" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-700 hover:bg-red-600 flex items-center justify-center"
              >
                <i className="fab fa-youtube" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-gray-700 hover:bg-purple-600 flex items-center justify-center"
              >
                <i className="fab fa-instagram" />
              </a>
            </div>
            <p className="text-gray-400 text-sm">Email: support@uitshare.vn</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>© 2023 UITShare. Bảo lưu mọi quyền.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
