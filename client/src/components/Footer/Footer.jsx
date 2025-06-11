import React from 'react';
import { Link } from 'react-router-dom';

function Footer ()
{
  return (
    <>
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
          <li><Link to="/" className="text-gray-400 hover:text-white text-sm">Trang chủ</Link></li>
          <li><Link to="/documents" className="text-gray-400 hover:text-white text-sm">Tài liệu</Link></li>
          <li><Link to="/comunity" className="text-gray-400 hover:text-white text-sm">Thảo luận</Link></li>
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
          <a href="https://www.facebook.com/" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-blue-600 flex items-center justify-center">
            <i className="fab fa-facebook-f" />
          </a>
          <a href="https://x.com/" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-blue-400 flex items-center justify-center">
            <i className="fab fa-twitter" />
          </a>
          <a href="https://www.youtube.com/" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-red-600 flex items-center justify-center">
            <i className="fab fa-youtube" />
          </a>
          <a href="https://www.instagram.com/" className="w-10 h-10 rounded-full bg-gray-700 hover:bg-purple-600 flex items-center justify-center">
            <i className="fab fa-instagram" />
          </a>
        </div>
        <p className="text-gray-400 text-sm">Email: UITShare@gm.uit.edu.vn</p>
      </div>
    </div>
    <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400 text-sm">
      <p>© 2025 UITShare. Bảo lưu mọi quyền.</p>
    </div>
  </div>
</footer>

    </>
  )
}

export default Footer;
