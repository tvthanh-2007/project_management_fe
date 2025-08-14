import { Card, Descriptions, Button, Space, Tabs, message, notification } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { ROLE_NAME, VISIBILITY_MAP, type VisibilityKey } from '../../constants/project';
import type { ProjectInterface } from '../../interface/project';
import type { MemberProjectInterface } from '../../interface/member_project';
import MemberProject from '../../components/project/MemberProject';
import { EditOutlined } from '@ant-design/icons';
import AddMemberProject from '../../components/project/AddMemberProject';
import { useEffect, useMemo, useState } from 'react';
import { getMemberProjectsApi, getProjectApi, inviteMemberApi } from '../../services/projectService';
import { useDispatch, useSelector } from 'react-redux';
import { loadProjectSuccess, type ProjectActionTypes } from '../../redux/project/actions';
import type { Dispatch } from 'redux';
import Paragraph from 'antd/es/typography/Paragraph';
import { selectUser } from '../../redux/user/selectors';
import { PERMIS_NAME } from '../../constants/user';

const ProjectDetailPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [project, setProject] = useState<ProjectInterface>();
  const [members, setMembers] = useState<MemberProjectInterface[]>([]);

  const navigate = useNavigate();
  const user = useSelector(selectUser)

  const { project_id } = useParams();
  const projectId = Number(project_id)
  const dispatch: Dispatch<ProjectActionTypes> = useDispatch();

  const { isAdmin, isManager } = useMemo(() => {
    console.log("calculating.....")
    const admin = user && PERMIS_NAME[user.role] === 'ADMIN';
    const manager = members.some(m => m.email === user?.email && m.role === ROLE_NAME.MANAGER);
    return { isAdmin: admin, isManager: manager };
  }, [members, user]);

  const handleAddMember = async (member: { email: string; role: VisibilityKey }) => {
    try {
      await inviteMemberApi(projectId, member)
      setModalVisible(false);
      notification.success({message: 'Invite member successfully!', placement: "top"});
    } catch (error) {
      message.error(`Unexpected error: ${error}`);
    }
  }

  const handleCancelModal = () => setModalVisible(false)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectRes = await getProjectApi(Number(project_id))
        setProject(projectRes.data)
        dispatch(loadProjectSuccess(projectRes.data))

        const membersRes = await getMemberProjectsApi(Number(project_id))
        setMembers(membersRes.data)
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }

    fetchProject()
  }, [project_id, dispatch]);

  const items = [
    {
      key: '1',
      label: 'Thông tin dự án',
      children: (
        <>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">{project?.name}</Descriptions.Item>
            <Descriptions.Item label="Description">
              <Paragraph style={{ whiteSpace: 'pre-wrap', margin: 0 }}>
                {project?.description}
              </Paragraph>
            </Descriptions.Item>
            <Descriptions.Item label="Visibility">{project && VISIBILITY_MAP[project?.visibility]?.label}</Descriptions.Item>
          </Descriptions>
          <Space style={{ marginTop: 16 }}>
            {(isAdmin || isManager) && (
              <Button type="primary" onClick={() => navigate(`/projects/${project_id}/edit`)}>
                <EditOutlined/>Edit
              </Button>
            )}
            <Button onClick={() => navigate('/projects')}>Back to List</Button>
          </Space>
        </>
      ),
    },
    {
      key: '2',
      label: 'Thành viên tham gia',
      children: (
        <>
          <MemberProject members={members} manage={isAdmin || isManager} />
          {(isAdmin || isManager) && (
            <>
              <Button style={{ marginTop: 16 }} type="primary" onClick={()=>{setModalVisible(true)}}>Add Member</Button>
              <AddMemberProject visible={modalVisible} onAdd={handleAddMember} onCancel={handleCancelModal}/>
            </>
          )}
        </>
      )
    },
  ];

  return (
    <Card title="Project Details" variant="borderless">
      <Tabs defaultActiveKey="1" items={items} />
    </Card>
  );
};

export default ProjectDetailPage;
