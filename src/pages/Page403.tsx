import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Page401 = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-not-found">
      <Result
        status="403"
        title="403"
        subTitle="Forbidden"
        extra={<Button color="cyan" variant="solid" onClick={() => navigate("/")}>Back Home</Button>}
      />
    </div>
  )
}

export default Page401;
