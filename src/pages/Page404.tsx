import { Result, Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Page401 = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState<string>("")

  useEffect(() => {
    const storedMsg = sessionStorage.getItem("msg404");

    if (storedMsg) {
      setMsg(storedMsg)
      sessionStorage.removeItem("msg404")
    }
  }, []);

  return (
    <div className="bg-not-found">
      <Result
        status="404"
        title="404"
        subTitle={msg || "Not Found"}
        extra={<Button color="cyan" variant="solid" onClick={() => navigate("/")}>Back Home</Button>}
      />
    </div>
  )
}

export default Page401;
