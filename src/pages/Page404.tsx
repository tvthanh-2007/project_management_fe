import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const Page401 = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-not-found">
      <Result
        status="404"
        title="404"
        subTitle="Not Found"
        extra={<Button color="cyan" variant="solid" onClick={() => navigate("/")}>Back Home</Button>}
      />
    </div>
  )
}

export default Page401;
