import { useState } from "react";
import { Form as AntdForm } from "antd";

import { Form } from "../components";

function Entrance() {
  const [form] = AntdForm.useForm();

  const [loginMode, setLoginMode] = useState(true);

  const setMode = (state: boolean) => {
    setLoginMode(state);
  };

  return (
    <div className="loginBG">
      <Form
        instance={form}
        onSubmit={() => {}}
        loginMode={loginMode}
        setLoginMode={setMode}
      />
    </div>
  );
}

export default Entrance;
