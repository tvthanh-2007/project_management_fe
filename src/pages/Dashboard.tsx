import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, ProductOutlined } from '@ant-design/icons';
import './Dashboard.scss'
import Title from 'antd/es/typography/Title';

const Dashboard = () => {
  return (
    <div>
      <Title level={3}>Dashboard</Title>
      <Row gutter={16}>
        <Col span={12}>
          <Card className="dashboard-card">
            <Statistic
              title="Users"
              value={1128}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card className="dashboard-card">
            <Statistic
              title="Projects"
              value={93}
              prefix={<ProductOutlined />}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
