import { Card, Descriptions, Button, Space, Tabs, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { VISIBILITY_MAP } from '../../constants/project';
import type { ProjectInterface } from '../../interface/project';
import type { MemberProjectInterface } from '../../interface/member_project';
import MemberProject from '../../components/project/MemberProject';
import { EditOutlined } from '@ant-design/icons';
import AddMemberProject from '../../components/project/AddMemberProject';
import { useState } from 'react';

const ProjectDetailPage = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const project: ProjectInterface = {
    id: id ? Number(id) : 0,
    name: 'Project Management App',
    description: 'A mini GitHub-like project management tool.',
    visibility: 0,
    user_id: 100
  };

  const joined_members: MemberProjectInterface[] = [
    { id: 1, name: 'Nguyen Van A', email: 'manager@gmail.com', role: 0 },
    { id: 2, name: 'Tran Thi B', email: 'member-write@gmail.com', role: 1},
    { id: 3, name: 'Le Van C', email: 'member-read@gmail.com', role: 2 },
  ];

  const handleAddMember = (member: { email: string; role: number }) => {
    console.log(member)
    message.success('Send invitation successfully!');
    setModalVisible(false);
  }

  const handleCancelModal = () => {
    setModalVisible(false)
  }

  const items = [
    {
      key: '1',
      label: 'Thông tin dự án',
      children: (
        <>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Name">{project.name}</Descriptions.Item>
            <Descriptions.Item label="Description">{project.description}</Descriptions.Item>
            <Descriptions.Item label="Visibility">{VISIBILITY_MAP[project.visibility].label}</Descriptions.Item>
          </Descriptions>
          <Space style={{ marginTop: 16 }}>
            <Button type="primary" onClick={() => navigate(`/projects/${id}/edit`)}>
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
          <MemberProject members={joined_members} />
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
