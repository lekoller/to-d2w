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

  const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:8000/api/v1";
  
  const client = new AuthClient(baseURL);

  const updateAuth = useUpdateAuth();
  const updateSpin = useUpdateSpin();
  const spin = useSpin();
  const navigate = useNavigate();
  
  const openNotification = (success: boolean, error: string = "We couldn't register your credentials, try again.") => {
    if (success) {
      api.open({
        message: 'Welcome to D2W!',
        description:
          `We registered your credentials, now you can log in.`,
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
      });
      return
    }
    api.open({
      message: 'Error!',
      description: error,
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
              updateAuth(res.token);

              navigate("/home");
            }
          })
          .catch(() => {
            openNotification(false, "Login unsuccessful, try again reviewing your credentials.");
          });

        break;
      case false:
        client
          .add(values)
          .then((res) => {
            if (res) {
              setLoginMode(true);
              openNotification(true);
              form.setFieldValue("password", "");
            }
          })
          .catch((err) => {
            openNotification(false, err.response.data.error);
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
