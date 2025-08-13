import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Spin, Result, Button, message } from 'antd';
import { verifyInvitation } from '../../services/invitationService';
import axios from 'axios';

const JoinProjectPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tokenParams = searchParams.get('token');
  const emailParams = searchParams.get('email');

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!tokenParams || !emailParams) {
      setLoading(false);
      setSuccess(false);
      setMsg('Invalid Token');
      return;
    }

    const joinProject = async () => {
      try {
        await verifyInvitation({email: emailParams, token: tokenParams})

        setSuccess(true);
        // setMessage('You have successfully joined the project!');
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const errors: { message: string } = err?.response?.data
          debugger
          setMsg(errors.message);
          setSuccess(false);
        } else {
          message.error(`Unexpected error: ${err}`);
        }
      } finally {
        setLoading(false);
      }
    };

    joinProject();
  }, [tokenParams, emailParams, success]);

  if (loading) return <div className="bg-not-found"><Spin spinning={loading}/></div>

  return (
    <div className="bg-not-found">
      <Result
        status={success ? 'success' : 'error'}
        title={success ? 'Success' : 'Failed'}
        subTitle={msg}
        extra={[
          <Button key="dashboard" type="primary" onClick={() => navigate('/')}>Back Home</Button>
        ]}
      />
    </div>
  );
};

export default JoinProjectPage;
