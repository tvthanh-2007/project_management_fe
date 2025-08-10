import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Spin, Result, Button } from 'antd';

const JoinProjectPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setSuccess(false);
      setMessage('Token không hợp lệ');
      return;
    }

    const joinProject = async () => {
      try {
        console.log(email)
        console.log(token)
        // Giả sử bạn có apiJoinProject(token) trả về true nếu thành công
        // const res = await apiJoinProject(token);
        if (success) {
          setSuccess(true);
          setMessage('Bạn đã tham gia dự án thành công!');
        } else {
          setSuccess(false);
          setMessage('Không thể tham gia dự án.');
        }
      } catch (error) {
        console.log(error)
        setSuccess(false);
        setMessage('Lỗi server, vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    joinProject();
  }, [token, email, success]);

  if (loading) return <div className="bg-not-found"><Spin spinning={loading}/></div>

  return (
    <div className="bg-not-found">
      <Result
        status={success ? 'success' : 'error'}
        title={success ? 'Tham gia dự án thành công!' : 'Tham gia dự án thất bại'}
        subTitle={message}
        extra={[
          <Button key="dashboard" type="primary" onClick={() => navigate('/')}>Back Home</Button>
        ]}
      />
    </div>
  );
};

export default JoinProjectPage;
