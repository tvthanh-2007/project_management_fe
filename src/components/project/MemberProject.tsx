import type { MemberProjectInterface } from '../../interface/member_project';
import { Table, Tag } from 'antd';
import { ROLE_NAME } from '../../constants/project';

interface MemberProjectProps {
  members: MemberProjectInterface[];
}

const columns: object[] = [
  {
    title: 'Members',
    dataIndex: 'name',
    key: 'fullName',
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

const MemberProject = ({ members }: MemberProjectProps) => {
  return <Table rowKey="id" columns={columns} dataSource={members} pagination={false} />;
};

export default MemberProject;
