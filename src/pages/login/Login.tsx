import './Login.scss'
import { Space, Typography, Card, Flex, Form, Input, Button, Divider, message } from 'antd'
import { AppleOutlined, FacebookOutlined, GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginApi } from '../../services/authService';
import { loginFailure, loginSuccess, type AuthActionTypes } from '../../redux/auth/actions';
import type { Dispatch } from 'redux';
import { selectAuthError } from '../../redux/auth/selectors'

const { Title, Link } = Typography

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch: Dispatch<AuthActionTypes> = useDispatch()
  const error = useSelector(selectAuthError)

  const handleLogin = async (req: {username: string, password: string}) => {
    try {
      const res = await loginApi(req.username, req.password)
      const { access_token, refresh_token, user } = res.data
      dispatch(loginSuccess(user, access_token, refresh_token))

      localStorage.setItem("token", access_token)
      localStorage.setItem("refresh", refresh_token)

      navigate('/dashboard')
      message.success("Login successfully!")
    } catch (e) {
      const data = (e as any).response?.data
      dispatch(loginFailure(data.error))
    }
  }

  return (
    <div className="bg-login">
      <Flex justify="center" align="center" className="login-wrapper" vertical>
        <Card className="card-login">
          <Space direction="vertical" size="small">
            <div className="icon-box">
              <LockOutlined style={{ fontSize: 24 }} />
            </div>

            <Title level={3}>Sign in</Title>

            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Form name="login" layout="vertical" onFinish={handleLogin}>
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
