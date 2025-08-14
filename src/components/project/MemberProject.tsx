import type { MemberProjectInterface } from '../../interface/member_project';
import { Button, Table, Tag } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { ROLE_NAME } from '../../constants/project';

interface Props {
  members: MemberProjectInterface[],
  manage: boolean
}

const handleDeleteMemberProject = () => {
  console.log("Deleting....")
}

const MemberProject = ({ members, manage }: Props) => {
  let columns: object[] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Manager',
      dataIndex: 'role',
      key: 'manager',
      align: 'center',
      render: (role: number) => role === ROLE_NAME.MANAGER ? <Tag color="blue">x</Tag> : null,
    },
    {
      title: 'Write',
      dataIndex: 'role',
      key: 'write',
      align: 'center',
      render: (role: number) => (
        role === ROLE_NAME.MANAGER ||
        role === ROLE_NAME.WRITE
      ) ? <Tag color="green">x</Tag> : null,
    },
    {
      title: 'Read',
      dataIndex: 'role',
      key: 'read',
      align: 'center',
      render: (role: number) => (
        role === ROLE_NAME.MANAGER ||
        role === ROLE_NAME.WRITE ||
        role === ROLE_NAME.READ
      ) ? <Tag color="orange">x</Tag> : null,
    },
  ];

  if (manage) {
    columns = [
      ...columns,
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        fixed: 'right',
        width: '100px',
        align: 'center',
        render: () => {
          return (
            <Button type="link" className="no-padding-btn" onClick={() => handleDeleteMemberProject()}>
              <DeleteOutlined className="action-icon delete" color="red" />
            </Button>
          )
        }
      },
    ]
  }

  return <Table rowKey="id" columns={columns} dataSource={members} pagination={false} scroll={{ x: 768 }} />;
};

export default MemberProject;
