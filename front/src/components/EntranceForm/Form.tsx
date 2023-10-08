import { Button, Form, Input } from "antd";

function EntranceForm() {
  return (
    <Form className="loginForm">
      <h1>Login</h1>
      <Form.Item name={"username"}>
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item name={"password"}>
        <Input placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
}

export default EntranceForm;
