import './Login.scss'
import { Space, Typography, Card, Flex, Form, Input, Button, Divider } from 'antd'
import { AppleOutlined, FacebookOutlined, GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'

const { Title, Link } = Typography

const LoginPage = () => {
  return (
    <div className="bg-login">
      <Flex justify="center" align="center" className="login-wrapper" vertical>
        <Card className="card-login">
          <Space direction="vertical" size="small">
            <div className="icon-box">
              <LockOutlined style={{ fontSize: 24 }} />
            </div>

            <Title level={3}>Sign in</Title>

            <Form name="login" layout="vertical">
              <Form.Item name="username" className="mb-10" rules={[{ required: true, message: 'Please input your Username!' }]}>
                <Input prefix={<UserOutlined />} placeholder="Username" variant="filled" />
              </Form.Item>

              <Form.Item name="password" className="mb-10" rules={[{ required: true, message: 'Please input your Password!' }]}>
                <Input.Password prefix={<LockOutlined />} placeholder="Password" variant="filled" />
              </Form.Item>

              <div className="align-right">
                <Link className="link-forgot-password">Forgot password?</Link>
              </div>

              <Form.Item className="mb-10">
                <Button color="default" variant="solid" htmlType="submit" block>
                  Get Started
                </Button>
              </Form.Item>
            </Form>

            <Divider plain>Or sign in with</Divider>

            <Space direction="horizontal" size="large" className="justify-center w-100">
              <Button shape="circle" size="large" icon={<GoogleOutlined />} />
              <Button shape="circle" size="large" icon={<FacebookOutlined />} />
              <Button shape="circle" size="large" icon={<AppleOutlined />} />
            </Space>
          </Space>
        </Card>
      </Flex>
    </div>
  )
}

export default LoginPage
