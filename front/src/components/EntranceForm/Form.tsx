import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { AuthDTO, EntranceFormProps } from "../../interfaces";

function EntranceForm({
  instance,
  loginMode,
  setLoginMode,
  onSubmit,
}: EntranceFormProps) {
  const toggleMode = () => {
    instance.resetFields();
    setLoginMode(!loginMode);
  };

  const onFinish = async (values: AuthDTO) => {
    onSubmit(values);
  };

  return (
    <Form className="loginForm" form={instance} onFinish={onFinish}>
      <h1>{loginMode ? "Login" : "Register"}</h1>
      <Form.Item
        name={"name"}
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          placeholder="Username"
          prefix={<UserOutlined className="site-form-item-icon" />}
        />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          placeholder="Password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Confirm
        </Button>
      </Form.Item>
      <div className="shadow">
        <p>
          {loginMode ? "New here" : "Already have an account"}?{" "}
          <a onClick={toggleMode}>{loginMode ? "Sign up" : "Sign in"}</a>.
        </p>
      </div>
    </Form>
  );
}

export default EntranceForm;
