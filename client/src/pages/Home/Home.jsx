import { Link } from 'react-router-dom';
import './style.css';
function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-[#3188F2] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-8">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Nền tảng chia sẻ tài liệu học tập hàng đầu cho sinh viên UIT!
            </h1>
            <p className="mt-4 text-lg">
              Tìm kiếm, chia sẻ và học hỏi với hàng ngàn tài liệu miễn phí từ cộng đồng
            </p>
            <div className="mt-6 flex justify-center lg:justify-start gap-4 flex-wrap">
              <button className="bg-white text-blue-700 hover:bg-gray-100 px-6 py-2 rounded-lg font-semibold transition">
                <Link to="/documents">Khám Phá Tài Liệu</Link>
              </button>
              <button className="bg-blue-800 hover:bg-blue-900 text-white px-6 py-2 rounded-lg font-semibold transition">
                <Link to="/community">Tham Gia Ngay</Link>
              </button>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src="123.jpg"
              alt="Sinh viên học tập"
              className="max-w-xs md:max-w-sm lg:max-w-md object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Phần 4 */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <img
                src="https://img.pikbest.com/png-images/20241127/book-open-icon-vector-silhouette-art-design_11140366.png!w700wp"
                alt="Kho tài liệu đa dạng"
                className="w-20 h-20 object-contain mx-auto mb-4"
              />
              <div className="text-lg font-bold mb-1">KHO TÀI LIỆU ĐA DẠNG</div>
              <p className="text-gray-600 text-sm">TỔNG HỢP NHIỀU TÀI LIỆU CHO MỌI HỌC PHẦN UIT</p>
            </div>
            <div>
              <img
                src="https://png.pngtree.com/png-clipart/20250104/original/pngtree-people-icon-business-corporate-team-working-social-network-group-logo-symbol-png-image_3985466.png"
                alt="Cộng đồng học tập"
                className="w-20 h-20 object-contain mx-auto mb-4"
              />
              <div className="text-lg font-bold mb-1">CỘNG ĐỒNG HỌC TẬP SÔI ĐỘNG</div>
              <p className="text-gray-600 text-sm">TRAO ĐỔI, THẢO LUẬN DỄ DÀNG</p>
            </div>
            <div>
              <img
                src="https://pethouse.com.vn/wp-content/uploads/2022/07/thuan-chung-100-phan-tram.png"
                alt="Tìm kiếm nhanh"
                className="w-20 h-20 object-contain mx-auto mb-4"
              />
              <div className="text-lg font-bold mb-1">TÌM KIẾM NHANH CHÓNG</div>
              <p className="text-gray-600 text-sm">TÌM TÀI LIỆU THEO MÔN HỌC</p>
            </div>
            <div>
              <img
                src="https://img.lovepik.com/png/20231007/Network-technology-security-logo-identification-circle-lock_117489_wh1200.png"
                alt="Bảo mật"
                className="w-20 h-20 object-contain mx-auto mb-4"
              />
              <div className="text-lg font-bold mb-1">ĐĂNG NHẬP BẢO MẬT</div>
              <p className="text-gray-600 text-sm">ĐẢM BẢO QUYỀN RIÊNG TƯ</p>
            </div>
          </div>

          <section className="mt-10 flex justify-center">
            <a
              href="#"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-full transition duration-300 text-center"
            >
              Đóng góp tài liệu – Gieo mầm tri thức cho thế hệ tiếp theo!
            </a>
          </section>
        </div>
      </div>
    </div>
  );
}

export default Home;
