import './Dashboard.scss'
import Title from 'antd/es/typography/Title';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, ProductOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getProjectsApi } from '../services/projectService';
import { getUsersApi } from '../services/userService';

const Dashboard = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [projectCount, setProjectCount] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projects = await getProjectsApi();
        setProjectCount(projects.data.length);

        const users = await getUsersApi();
        setUserCount(users.data.length);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Title level={3}>Dashboard</Title>
      <Row gutter={16}>
        <Col span={12}>
          <Card className="dashboard-card">
            <Statistic
              title="Users"
              value={userCount}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card className="dashboard-card">
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

