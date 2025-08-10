import { Button, Space, Table, Tag } from "antd";
import { VISIBILITY_MAP } from "../../constants/project";
import type { VisibilityKey } from "../../constants/project";
import type { Project } from "../../interface/project";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";

interface Props {
  role: string;
  onEdit: (record: Project) => void;
  onDelete: (record: Project) => void;
  onView: (record: Project) => void;
}

const ProjectList = ({ role, onEdit, onDelete, onView } : Props) => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  let columns: any[] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: Project) => (
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

  if (role === "admin") {
    columns = [
      ...columns,
      {
        title: "Action",
        dataIndex: "action",
        key: "action",
        fixed: "right",
        width: "100px",
        render: (_: any, record: Project) => {
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
  /* eslint-enable @typescript-eslint/no-explicit-any */

  const projects: Project[]  = [
    {
      id: 1,
      name: "Project Alpha",
      description: "First public project for testing",
      visibility: 0, // Public
    },
    {
      id: 2,
      name: "Project Beta",
      description: "Private internal project",
      visibility: 1, // Private
    },
    {
      id: 3,
      name: "Project Gamma",
      description: "Old public project that has been deleted",
      visibility: 0,
    },
    {
      id: 4,
      name: "Project Delta",
      description: "Secret private project for admin eyes only",
      visibility: 1,
    },
  ];

  return (
    <>
      <Title level={3}>Projects</Title>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={projects}
        scroll={{ x: 768 }}
        pagination={{ pageSize: 10 }}
      />
    </>
  )
}

export default ProjectList;
