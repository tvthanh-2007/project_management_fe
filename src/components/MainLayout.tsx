import { useState } from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined, DashboardOutlined, LogoutOutlined, ProfileOutlined } from '@ant-design/icons';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import './MainLayout.scss'
import { Footer } from 'antd/es/layout/layout';

const { Header, Sider, Content } = Layout;

const menuItems = [
  { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard', path: '/dashboard' },
  { key: 'project', icon: <ProfileOutlined />, label: 'Projects', path: '/projects' },
];

const getSelectedKey = (pathname: string): string => {
  if (pathname.startsWith('/dashboard')) return 'dashboard';
  if (pathname.startsWith('/projects')) return 'project';
  return 'dashboard'; // mặc định
};

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const toggle = () => setCollapsed(!collapsed);

  const currentPath = location.pathname;
  const selectedKey = getSelectedKey(currentPath);

  const onMenuClick = ({ key }: { key: string }) => {
    navigate(menuItems.find(i => i.key === key)?.path || "/");
  };


  const menuProfiles = [
    { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', path: "/login" },
  ];

  const menuProfileProps = {
    items: menuProfiles,
    onClick: ({ key }: { key: string }) => {
      console.log(key)
      navigate(menuProfiles.find(i => i.key === key)?.path || currentPath);
    },
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark" collapsible collapsed={collapsed} width={250} onCollapse={toggle}>
        <div className="sider-title">{collapsed ? 'PM' : 'Project Management'}</div>
        <Menu mode="inline" defaultSelectedKeys={[selectedKey]} items={menuItems} theme="dark" onClick={onMenuClick}/>
      </Sider>
      <Layout>
        <Header className="header-layout" >
          <Dropdown menu={menuProfileProps} trigger={['click']}>
            <Avatar className="point-cursor" icon={<UserOutlined />} size="large"/>
          </Dropdown>
        </Header>

        <Content className="content-layout">
          <Outlet /> {/* renden children as Dashboard */}
        </Content>

        <Footer className="footer-layout">Project Management Created by Thanh Truong</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
