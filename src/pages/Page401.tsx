import { WarningOutlined } from "@ant-design/icons";
import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Page401 = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-not-found">
      <Result
        icon={<WarningOutlined style={{ fontSize: 72, color: '#faad14' }} />}
        title="401"
        subTitle="Permission Denied"
        extra={<Button color="cyan" variant="solid" onClick={() => navigate("/")}>Back Home</Button>}
      />
    </div>
  )
}

export default Page401;
