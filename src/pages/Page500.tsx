import { Result, Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Page401 = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState<string>("")

  useEffect(() => {
    const storedMsg = sessionStorage.getItem("msg500")
    if (storedMsg) {
      setMsg(storedMsg)
      sessionStorage.removeItem("msg500")
    }
  }, []);

  return (
    <div className="bg-not-found">
      <Result
        status="500"
        title="500"
        subTitle={msg || "Internal server error"}
        extra={<Button color="cyan" variant="solid" onClick={() => navigate("/")}>Back Home</Button>}
      />
    </div>
  )
}

export default Page401;
