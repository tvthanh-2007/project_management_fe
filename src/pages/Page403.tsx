import { Result, Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Page401 = () => {
  const navigate = useNavigate()
  const [msg, setMsg] = useState<string>("")

  useEffect(() => {
    const storedMsg = sessionStorage.getItem("msg403");

    if (storedMsg) {
      setMsg(storedMsg);
      sessionStorage.removeItem("msg403"); // cleanup ngay khi đã dùng
    }
  }, []);

  return (
    <div className="bg-not-found">
      <Result
        status="403"
        title="403"
        subTitle={msg || "Forbidden"}
        extra={<Button color="cyan" variant="solid" onClick={() => navigate("/")}>Back Home</Button>}
      />
    </div>
  )
}

export default Page401;
