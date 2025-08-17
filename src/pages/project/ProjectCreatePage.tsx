import { Card, Form, Input, Button, Select, Space, message, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { VISIBILITY_MAP, type VisibilityKey } from '../../constants/project';
import { useEffect, useState } from 'react';
import { createProjectApi } from '../../services/projectService';
import axios from 'axios';

const { Option } = Select;

const ProjectCreatePage = () => {
  const [form] = Form.useForm();
  const [errorsApi, setErrorsApi] = useState<Record<string, string[]>>({})
  const navigate = useNavigate();


  useEffect(() => {
    console.log("rendering....")

    form.setFieldsValue({
      name: null,
      description: null,
      visibility: 0,
    });
  }, [form]);

  const onFinish = async (formValues: { name: string, description: string; visibility: VisibilityKey }) => {
    form.setFields(
      Object.keys(errorsApi).map((field) => ({
        name: field,
        errors: [],
      }))
    );

    try {
      await createProjectApi({ project: { ...formValues }})
      navigate(`/projects`);

      notification.success({message: 'Project created successfully!', placement: "top"});
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
    <Card title="New Project" variant="borderless">
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
            <Button onClick={() => navigate(`/projects`)}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ProjectCreatePage;
