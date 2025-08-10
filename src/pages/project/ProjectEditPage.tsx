import { Card, Form, Input, Button, Select, Space, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { VISIBILITY_MAP, type VisibilityKey } from '../../constants/project';
import type { ProjectInterface } from '../../interface/project';
// import type { VisibilityKey } from '../../constants/project';

import { useEffect } from 'react';

const { Option } = Select;

const ProjectEditPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();

  const projectId = id ? Number(id) : 0;

  const project: ProjectInterface = {
    id: projectId,
    name: 'Project Management App',
    description: 'A mini GitHub-like project management tool.',
    visibility: 0,
    user_id: 100,
  };

  useEffect(() => {
    form.setFieldsValue({
      name: project.name,
      description: project.description,
      visibility: project.visibility,
    });
  }, [form, project]);

  const onFinish = (values: { name: string, description: string; visibility: VisibilityKey }) => {
    console.log('Updated values:', values);

    message.success('Project updated successfully!');

    navigate(`/projects/${projectId}`);
  };

  return (
    <Card title="Edit Project" variant="borderless">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Project Name"
          name="name"
          className='bold'
          rules={[{ required: true, message: 'Please input the project name!' }]}
        >
          <Input placeholder="Enter project name" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          className='bold'
          rules={[{ required: true, message: 'Please input the project description!' }]}
        >
          <Input.TextArea rows={4} placeholder="Enter project description" />
        </Form.Item>

        <Form.Item
          label="Visibility"
          name="visibility"
          className='bold'
          rules={[{ required: true, message: 'Please select visibility!' }]}
        >
          <Select>
            {Object.entries(VISIBILITY_MAP).map(([key, { label }]) => (
              <Option key={key} value={Number(key)}>
                {label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button onClick={() => navigate(`/projects/${projectId}`)}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProjectEditPage;
