import './MainLayout.scss'
import { useEffect, useState } from 'react';
import { UserOutlined, DashboardOutlined, LogoutOutlined, ProfileOutlined } from '@ant-design/icons';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { Layout, Menu, Dropdown, Avatar, message } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../redux/user/selectors';
import { logoutApi } from '../services/authService';
import { logout, type AuthActionTypes } from '../redux/auth/actions';
import type { Dispatch } from 'redux';
import { loadUserSuccess, removeUserInfo, type UserActionTypes } from '../redux/user/actions';
import { getUserApi } from '../services/userService';

const { Header, Sider, Content } = Layout;

const menuItems = [
  { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard', path: '/dashboard' },
  { key: 'project', icon: <ProfileOutlined />, label: 'Projects', path: '/projects' },
];

const getSelectedKey = (pathname: string): string => {
  if (pathname.startsWith('/dashboard')) return 'dashboard';
  if (pathname.startsWith('/projects')) return 'project';
  return 'dashboard';
};

const MainLayout = () => {
  const dispatch: Dispatch<UserActionTypes | AuthActionTypes> = useDispatch()
  const user = useSelector(selectUser)

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

  const handleLogout = async () => {
    try {
      await logoutApi()
      localStorage.removeItem("token")
      localStorage.removeItem("refresh")

      dispatch(logout())
      dispatch(removeUserInfo())

      navigate("/login")
      message.success("Logout successfully!")
    } catch (err) {
      console.error('Logout API error:', err);
    }
  }

  const menuProfileProps = {
    items: menuProfiles,
    onClick: ({ key }: { key: string }) => {
      if (key ===  'logout') {
        handleLogout();
      } else {
        navigate(menuProfiles.find(i => i.key === key)?.path || currentPath);
      }
    },
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserApi();
        dispatch(loadUserSuccess(res.data))
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };
    fetchUser();
  }, [dispatch]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark" collapsible collapsed={collapsed} width={250} onCollapse={toggle}>
        <div className="sider-title">{collapsed ? 'PM' : 'Project Management'}</div>
        <Menu mode="inline" defaultSelectedKeys={[selectedKey]} items={menuItems} theme="dark" onClick={onMenuClick}/>
      </Sider>
      <Layout>
        <Header className="header-layout" >
          {user && <div className='mr-10'>{user.name}</div>}
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
