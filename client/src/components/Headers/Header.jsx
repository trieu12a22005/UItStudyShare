import React, { useState } from 'react';
import { ConfigProvider, Dropdown, Space } from 'antd';
import { Menu, Badge, Avatar } from 'antd';
import { SearchOutlined, QuestionCircleOutlined, BellOutlined, UserOutlined, DownOutlined } from '@ant-design/icons'
import "./style.scss"
import AuthButtons from '../Authbutton/Authbutton';
import { useAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';

const items = [
  {
    label: 'Trang chủ',
    key: 'home',
  },
  {
    label: 'Trang tài liệu',
    key: 'document',
  },
  {
    label: 'Trang đề thi',
    key: 'test',
  },
  {
    label: 'Cộng đồng',
    key: 'community',
  },

];
function Header() {
  const [current, setCurrent] = useState('mail');
  const { isLogin, logout } = useAuth();
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  const navigate = useNavigate();

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

  const handleUserMenuClick = ({ key }) => {
    if (key === 'logout') {
      logout();              
      navigate('/');     
    } else if (key === 'profile') {
      navigate('/profile');  
    }
    else if (key ==='changepassword'){
      navigate('/password/change')
    }
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            itemHoverColor: "#02542D",
            itemSelectedColor: "#02542D",
            itemHeight: 500
          },
        },
      }}
    >
      <div className='layout__menu'>
        <img src="img/image.png" alt="Logo" className='layout__menu-img' />
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ height: "60px", fontSize: "18px", marginTop: "10px", flex: 1 }} />
        {isLogin ? (
          <div className='layout__menu-tool'>
            <div>
              <SearchOutlined />
            </div>
            <div>
              <QuestionCircleOutlined />
            </div>
            <div className='layout__menu-tool-not'>
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
              <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} size={28} />
                <Space>
                  <b>Mẫn Nhi</b>
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
  )
}
export default Header;
