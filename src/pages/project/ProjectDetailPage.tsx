import { Card, Descriptions, Button, Space, Tabs, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { VISIBILITY_MAP } from '../../constants/project';
import type { ProjectInterface } from '../../interface/project';
import type { MemberProjectInterface } from '../../interface/member_project';
import MemberProject from '../../components/project/MemberProject';
import { EditOutlined } from '@ant-design/icons';
import AddMemberProject from '../../components/project/AddMemberProject';
import { useEffect, useState } from 'react';
import { getMemberProjectsApi, getProjectApi } from '../../services/projectService';
import { useDispatch } from 'react-redux';
import { loadProjectSuccess, type ProjectActionTypes } from '../../redux/project/actions';
import type { Dispatch } from 'redux';

const ProjectDetailPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [project, setProject] = useState<ProjectInterface>();
  const [members, setMembers] = useState<MemberProjectInterface[]>([]);

  const navigate = useNavigate();
  const { project_id } = useParams();
  const dispatch: Dispatch<ProjectActionTypes> = useDispatch();

  const handleAddMember = (member: { email: string; role: number }) => {
    console.log(member)
    message.success('Send invitation successfully!');
    setModalVisible(false);
  }

  const handleCancelModal = () => {
    setModalVisible(false)
  }

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
            <Descriptions.Item label="Description">{project?.description}</Descriptions.Item>
            <Descriptions.Item label="Visibility">{project && VISIBILITY_MAP[project?.visibility]?.label}</Descriptions.Item>
          </Descriptions>
          <Space style={{ marginTop: 16 }}>
            <Button type="primary" onClick={() => navigate(`/projects/${project_id}/edit`)}>
              <EditOutlined/>Edit
            </Button>
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
          <MemberProject members={members} />
          <Button style={{ marginTop: 16 }} type="primary" onClick={()=>{setModalVisible(true)}}>Add Member</Button>
          <AddMemberProject visible={modalVisible} onAdd={handleAddMember} onCancel={handleCancelModal}/>
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
