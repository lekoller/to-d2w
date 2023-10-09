import { Button, Form, Input } from "antd";
import { EntranceFormProps } from "../../interfaces";

function EntranceForm({
  instance,
  loginMode,
  setLoginMode,
}: EntranceFormProps) {
  const toggleMode = () => {
    instance.resetFields();
    setLoginMode(!loginMode);
  };

  return (
    <Form className="loginForm" form={instance}>
      <h1>{loginMode ? "Login" : "Register"}</h1>
      <Form.Item name={"username"}>
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item name={"password"}>
        <Input placeholder="Password" />
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
