import { useState } from "react";
import { notification, Form as AntdForm, Spin } from "antd";
import { SmileOutlined } from '@ant-design/icons';

import { Form } from "../components";
import { AuthClient } from "../services";
import { AuthDTO } from "../interfaces";
import { useSpin, useUpdateAuth, useUpdateSpin } from "../contexts";
import { useNavigate } from "react-router-dom";

function Entrance() {
  const [form] = AntdForm.useForm();
  const [loginMode, setLoginMode] = useState(true);
  const [api, contextHolder] = notification.useNotification();

  const client = new AuthClient();

  const updateAuth = useUpdateAuth();
  const updateSpin = useUpdateSpin();
  const spin = useSpin();
  const navigate = useNavigate();
  
  const openNotification = () => {
    api.open({
      message: 'Welcome to D2W!',
      description:
        `We registered your credentials, now you can log in.`,
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };


  const setMode = (state: boolean) => {
    setLoginMode(state);
  };


  const onSubmit = (values: AuthDTO) => {
    updateSpin(true);

    setTimeout(() => {
      updateSpin(false);
    }, 400);

    switch (loginMode) {
      case true:
        client
          .login(values)
          .then((res) => {
            if (res) {
              // localStorage.setItem("token", res.token);
              // window.location.href = "/todo";
              console.log("res", res);

              updateAuth(res.token);

              navigate("/home");
            }
          })
          .catch((err) => {
            console.log(err);
          });

        break;
      case false:
        client
          .add(values)
          .then((res) => {
            if (res) {
              setLoginMode(true);
              openNotification();
              form.setFieldValue("password", "");
            }
          })
          .catch((err) => {
            console.log(err);
          });

        break;
      default:
        break;
    }
  };

  return (
    <div className="loginBG">
      {contextHolder}
      <Spin style={{ marginTop: "20vh" }} spinning={spin}>
        <Form
          instance={form}
          onSubmit={onSubmit}
          loginMode={loginMode}
          setLoginMode={setMode}
        />
        
      </Spin>
    </div>
  );
}

export default Entrance;
