import React from 'react';
import {
  ConfigProvider,
  Dropdown,
  Space,
  Menu,
  Avatar,
  Button,
} from 'antd';
import {
  DownOutlined,
  UserOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import './style.scss';
import AuthButtons from '../Authbutton/Authbutton';
import { useAuth } from '../../hooks/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const menuItems = [
  { label: 'Trang chủ', key: 'home' },
  { label: 'Trang tài liệu', key: 'documents' },
  { label: 'Cộng đồng', key: 'community' },
];

function Header() {
  const { isLogin, logout, user } = useAuth() || {};
  const navigate = useNavigate();
  const location = useLocation();

  // Tự động xác định tab active từ URL
  const getKeyFromPath = (pathname) => {
    if (pathname.startsWith('/documents')) return 'documents';
    if (pathname.startsWith('/community')) return 'community';
    return 'home';
  };

  const current = getKeyFromPath(location.pathname);

  const onClick = (e) => {
    switch (e.key) {
      case 'home':
        navigate('/');
        break;
      case 'documents':
        navigate('/documents');
        break;
      case 'community':
        navigate('/community');
        break;
      default:
        break;
    }
  };

  const userMenuItems = [
    { label: 'Trang cá nhân', key: 'profile' },
    { label: 'Đổi mật khẩu', key: 'changepassword' },
    { label: 'Đăng xuất', key: 'logout' },
  ];

  const handleUserMenuClick = async ({ key }) => {
    if (key === 'logout') {
      await logout();
      navigate('/');
    } else if (key === 'profile') {
      navigate('/profile');
    } else if (key === 'changepassword') {
      navigate('/password/change');
    }
  };

  return (
     <>
      <div className="bg-white shadow fixed top-0 left-0 w-full z-50">
        <div className="max-w-screen-xl mx-auto px-4">
          <ConfigProvider
            theme={{
              components: {
                Menu: {
                  itemHoverColor: '#02542D',
                  itemSelectedColor: '#02542D',
                },
              },
            }}
          >
            <div className="flex items-center justify-between h-[70px] w-full gap-4">
              {/* Logo hình tròn */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img
                    src="/img/image.png"
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Menu tab ngang full width */}
              <div className="flex-grow">
                <Menu
                  onClick={onClick}
                  selectedKeys={[current]}
                  mode="horizontal"
                  items={menuItems}
                  style={{
                    fontSize: '16px',
                    borderBottom: 'none',
                  }}
                />
              </div>

              {/* Tải lên + Avatar */}
              <div className="flex items-center gap-3 flex-shrink-0">
                {isLogin ? (
                  <>
                    <Button
                      type="primary"
                      icon={<UploadOutlined />}
                      onClick={() => navigate('/documents/upload')}
                    >
                      Tải lên tài liệu
                    </Button>
                    <Dropdown
                      menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
                      trigger={['click']}
                    >
                      <div className="flex items-center gap-2 cursor-pointer">
                        <Avatar
                          style={{ backgroundColor: '#87d068' }}
                          icon={<UserOutlined />}
                          size={28}
                        />
                        <Space>
                          <b>{user?.fullName || 'Người dùng'}</b>
                          <DownOutlined />
                        </Space>
                      </div>
                    </Dropdown>
                  </>
                ) : (
                  <AuthButtons />
                )}
              </div>
            </div>
          </ConfigProvider>
        </div>
      </div>

      {/* Chừa chỗ trống tránh che nội dung */}
      <div className="h-[70px]" />
    </>
  );
}

export default Header;
