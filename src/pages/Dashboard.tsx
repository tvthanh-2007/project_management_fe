import './Dashboard.scss'
import Title from 'antd/es/typography/Title';
import { Card, Row, Col, Statistic, message } from 'antd';
import { UserOutlined, ProductOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getProjectsApi } from '../services/projectService';
import { getUsersApi } from '../services/userService';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/user/selectors';
import { PERMIS_NAME } from '../constants/user';
import axios from 'axios';

const Dashboard = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [projectCount, setProjectCount] = useState<number>(0);
  const user = useSelector(selectUser)

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const projects = await getProjectsApi();
        setProjectCount(projects.data.length);

        if (user && PERMIS_NAME[user.role] === "ADMIN") {
          const users = await getUsersApi();
          setUserCount(users.data.length);
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          message.error(err.response?.data?.error || "Something went wrong");
        } else {
          message.error("Unexpected error");
        }
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchData();
  }, [user]);

  return (
    <div>
      <Title level={3}>Dashboard</Title>
      <Row gutter={16}>
        { user && PERMIS_NAME[user.role] === "ADMIN" &&
          (
            <Col span={12}>
              <Card className="dashboard-card users">
                <Statistic
                  title="Users"
                  value={userCount}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
          )
        }

        <Col span={12}>
          <Card className="dashboard-card projects">
            <Statistic
              title="Projects"
              value={projectCount}
              prefix={<ProductOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;

