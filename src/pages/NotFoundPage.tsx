import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-not-found">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button color="cyan" variant="solid" onClick={() => navigate("/")}>Back Home</Button>}
      />
    </div>
  )
}

export default NotFoundPage;
