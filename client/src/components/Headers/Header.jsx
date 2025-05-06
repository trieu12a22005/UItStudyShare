import React, { useState } from 'react';
import {
  ConfigProvider,
  Dropdown,
  Space,
  Menu,
  Badge,
  Avatar,
} from 'antd';
import {
  SearchOutlined,
  QuestionCircleOutlined,
  BellOutlined,
  UserOutlined,
  DownOutlined,
} from '@ant-design/icons';
import './style.scss';
import AuthButtons from '../Authbutton/Authbutton';
import { useAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';

const menuItems = [
  { label: 'Trang chủ', key: 'home' },
  { label: 'Trang tài liệu', key: 'document' },
  { label: 'Trang đề thi', key: 'test' },
  { label: 'Cộng đồng', key: 'community' },
];

function Header() {
  const [current, setCurrent] = useState('home');
  const { isLogin, logout, user } = useAuth() || {}; // lấy user từ context
  const navigate = useNavigate();

  const onClick = (e) => {
    setCurrent(e.key);
    switch (e.key) {
      case 'home':
        navigate('/');
        break;
      case 'document':
        navigate('/document');
        break;
      case 'test':
        navigate('/test');
        break;
      case 'community':
        navigate('/community');
        break;
      default:
        break;
    }
  };

  const userMenuItems = [
    {
      label: 'Trang cá nhân',
      key: 'profile',
    },
    {
      label: 'Đổi mật khẩu',
      key: 'changepassword',
    },
    {
      label: 'Đăng xuất',
      key: 'logout',
    },
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
    <div className="bg-white shadow">
  <div className="max-w-screen-xl mx-auto px-4">
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemHoverColor: '#02542D',
            itemSelectedColor: '#02542D',
            itemHeight: 500,
          },
        },
      }}
    >
      <div className="layout__menu">
        <img
          src="/img/image.png"
          alt="Logo"
          className="layout__menu-img"
        />
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={menuItems}
          style={{
            height: '60px',
            fontSize: '18px',
            marginTop: '10px',
            flex: 1,
          }}
        />
        {isLogin ? (
          <div className="layout__menu-tool">
            <div>
              <SearchOutlined />
            </div>
            <div>
              <QuestionCircleOutlined />
            </div>
            <div className="layout__menu-tool-not">
              <Badge count={5}>
                <div>
                  <BellOutlined />
                </div>
              </Badge>
            </div>
            <Dropdown
              menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
              trigger={['click']}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                }}
              >
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
          </div>
        ) : (
          <AuthButtons />
        )}
      </div>
    </ConfigProvider>
    </div>
  </div>
  );
}

export default Header;
