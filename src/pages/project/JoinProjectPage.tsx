import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { Spin, Result, Button } from 'antd';
import { verifyInvitation } from '../../services/invitationService';

const JoinProjectPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const tokenParams = searchParams.get('token');
  const emailParams = searchParams.get('email');
  const { project_id } = useParams();

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    console.log("rendering...")

    if (!tokenParams || !emailParams) {
      setLoading(false);
      setSuccess(false);
      setMsg('Invalid Token');
      return;
    }

    const joinProject = async () => {
      try {
        const { data } = await verifyInvitation(Number(project_id), {email: emailParams, token: tokenParams})

        setSuccess(true);
        setLoading(false);
        setMsg(data.message);
      } catch (err) {
        console.log(err)
      }
    };

    joinProject();
  }, [tokenParams, emailParams, project_id]);

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
