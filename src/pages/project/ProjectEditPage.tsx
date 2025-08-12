import { Card, Form, Input, Button, Select, Space, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { VISIBILITY_MAP, type VisibilityKey } from '../../constants/project';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProject } from '../../redux/project/selectors';
import { getProjectApi } from '../../services/projectService';
import type { ProjectInterface } from '../../interface/project';

const { Option } = Select;

const ProjectEditPage = () => {
  const { project_id } = useParams();

  const [form] = Form.useForm();
  const [project, setProject] = useState<ProjectInterface>()
  const navigate = useNavigate();
  const projectFromRedux = useSelector(selectProject)

  const fetchProject = async (id: number) => {
    const projectRes = await getProjectApi(id)
    setProject(projectRes.data)
  }

  useEffect(() => {
    if (projectFromRedux && projectFromRedux.id === Number(project_id)) setProject(projectFromRedux as ProjectInterface)
    if (!project || project.id !== Number(project_id)) fetchProject(Number(project_id))

    form.setFieldsValue({
      name: project?.name,
      description: project?.description,
      visibility: project?.visibility,
    });
  }, [projectFromRedux, form, project, project_id]);

  const onFinish = (values: { name: string, description: string; visibility: VisibilityKey }) => {
    console.log('Updated values:', values);
    navigate(`/projects/${project_id}`);
    message.success('Project updated successfully!');
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
            <Button onClick={() => navigate(`/projects/${project_id}`)}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProjectEditPage;
