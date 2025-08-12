import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Page401 = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-not-found">
      <Result
        status="500"
        title="500"
        subTitle="Internal server error"
        extra={<Button color="cyan" variant="solid" onClick={() => navigate("/")}>Back Home</Button>}
      />
    </div>
  )
}

export default Page401;
