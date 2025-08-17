import type { VisibilityKey } from "../../constants/project";
import type { ProjectInterface } from "../../interface/project";
import type { Role } from "../../constants/user";
import { Button, Space, Table, Tag } from "antd";
import { VISIBILITY_MAP } from "../../constants/project";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";

interface Project {
  id: number,
  name: string,
  description: string,
  visibility: VisibilityKey,
  user_id: number
}

interface Props {
  role: Role | null;
  projects: Project[]
  onEdit: (record: ProjectInterface) => void;
  onDelete: (record: ProjectInterface) => void;
  onView: (record: ProjectInterface) => void;
}

const ProjectList = ({ role, projects, onEdit, onDelete, onView } : Props) => {
  const navigate = useNavigate()
  if (role === null) navigate('/login')

  let columns: object[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: ProjectInterface) => (
        <a onClick={() => onView(record)}>{text}</a>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Visibility",
      dataIndex: "visibility",
      key: "visibility",
      width: "100px",
      render: (visibility: VisibilityKey) => {
        const { label, color } = VISIBILITY_MAP[visibility] || {};
        return <Tag color={color}>{label}</Tag>
      },
    }
  ];

  // admin
  if (role === 0) {
    columns = [
      ...columns,
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        fixed: "right",
        width: "100px",
        render: (_: number, record: ProjectInterface) => {
          return (
            <Space size="small">
              <Button type="link" className="no-padding-btn" onClick={() => onEdit(record)}>
                <EditOutlined className="action-icon edit" color="blue"/>
              </Button>
              <Button type="link" danger className="no-padding-btn" onClick={() => onDelete(record)}>
                <DeleteOutlined className="action-icon delete" color="red" />
              </Button>
            </Space>
          )
        },
      }
    ];
  }

  return (
    <>
      <Title level={3}>Projects</Title>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
        <Button style={{ marginTop: 16 }} type="primary" onClick={() => navigate("/projects/new")}>Add New Project</Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={projects}
        scroll={{ x: 768 }}
        pagination={{ pageSize: 4 }}
      />
    </>
  )
}

export default ProjectList;
