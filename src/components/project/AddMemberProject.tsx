import { Form, Input, Select, Modal } from "antd";
import { MEMBER_ROLE_MAP } from "../../constants/project";

const { Option } = Select;

interface AddMemberProps {
  visible: boolean,
  onAdd: (member: {email: string, role: number}) => void,
  onCancel: () => void
}

const AddMemberProject = ({ visible, onCancel, onAdd }: AddMemberProps) => {
  const [form] = Form.useForm();

  return (
    <Modal title="Add Member" visible={visible} okText="Add"
      onOk={() => form.submit()}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
    >
      <Form form={form} layout="vertical" name="add_member_form" onFinish={onAdd}>
        <Form.Item name="email" label="Email"
          rules={[
            { required: true, message: 'Please input member email!' },
            { type: 'email', message: 'Please enter a valid email!' },
          ]}
        >
          <Input placeholder="member@example.com" />
        </Form.Item>

        <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please select a role!' }]}>
          <Select placeholder="Select a role">
            {Object.entries(MEMBER_ROLE_MAP).map(([key, value]) => (
              <Option key={key} value={Number(key)}>
                {value.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddMemberProject;
