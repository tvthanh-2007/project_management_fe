import { Card, Form, Input, Button, Select, Space, message, notification } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { VISIBILITY_MAP, type VisibilityKey } from '../../constants/project';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProject } from '../../redux/project/selectors';
import { getProjectApi, updateProjectApi } from '../../services/projectService';
import type { ProjectInterface } from '../../interface/project';
import axios from 'axios';

const { Option } = Select;

const ProjectEditPage = () => {
  const { project_id } = useParams();
  const projectId = Number(project_id)

  const [form] = Form.useForm();
  const [project, setProject] = useState<ProjectInterface>()
  const [errorsApi, setErrorsApi] = useState<Record<string, string[]>>({})
  const navigate = useNavigate();
  const projectFromRedux = useSelector(selectProject)

  const fetchProject = async (id: number) => {
    try {
      const projectRes = await getProjectApi(id)
      setProject(projectRes.data)
    } catch (error) {
      message.error(`Failed to load project data: ${error}`);
    }
  }

  useEffect(() => {
    console.log("rendering....")
    if (projectFromRedux && projectFromRedux.id === projectId) setProject(projectFromRedux as ProjectInterface)
    if (!project || project.id !== projectId) fetchProject(projectId)

    form.setFieldsValue({
      name: project?.name,
      description: project?.description,
      visibility: project?.visibility,
    });
  }, [projectFromRedux, form, project, projectId]);

  const onFinish = async (formValues: { name: string, description: string; visibility: VisibilityKey }) => {
    if (!project) return;

    form.setFields(
      Object.keys(errorsApi).map((field) => ({
        name: field,
        errors: [],
      }))
    );

    try {
      await updateProjectApi(
        {
          project: {
            id: project.id,
            user_id: project.user_id,
            ...formValues
          }
        }
      )

      navigate(`/projects/${project.id}`);

      notification.success({message: 'Project updated successfully!', placement: "top"});
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errors: { attribute: string, message: string[] }[] = err?.response?.data?.errors ?? [];

        // convert to object: { name: "error message", ... }
        const formattedErrors: Record<string, string[]> = {};
        errors.forEach(e => {
          formattedErrors[e.attribute] = e.message;
        });

        setErrorsApi(formattedErrors)

        form.setFields(
          Object.entries(formattedErrors).map(([field, msg]) => ({
            name: field,
            errors: msg,
          }))
        );
        // setErrorsApi({});
      } else {
        message.error("Unexpected error");
      }
    }
  };

  return (
    <Card title="Edit Project" variant="borderless">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Project Name" name="name" className='bold'>
          <Input placeholder="Enter project name" />
        </Form.Item>

        <Form.Item label="Description" name="description" className='bold'>
          <Input.TextArea rows={4} placeholder="Enter project description" />
        </Form.Item>

        <Form.Item
          label="Visibility"
          name="visibility"
          className='bold'
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
