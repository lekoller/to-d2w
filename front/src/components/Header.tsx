import React from "react";
import { Form, Input, Button, Typography, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { PlusOutlined } from "@ant-design/icons";
import { CreateItemDTO } from "../interfaces";
import { TodoListClient } from "../services";
import { useUpdateSpin, useTodoListUpdate } from "../contexts";

const D2wHeader: React.FC = () => {
  const [form] = Form.useForm();

  // const title = Form.useWatch("title", form);
  // const discription = Form.useWatch("description", form);
  const client = new TodoListClient();

  const updateItems = useTodoListUpdate();
  const updateSpin = useUpdateSpin();

  const onFinish = async (values: CreateItemDTO) => {
    updateSpin(true);
    
    setTimeout(() => {
      updateSpin(false);
    }, 400);
    
    await client.add(values)
    
    updateItems([], true);
    
    
    form.resetFields();
  };

  // console.log(title);
  // console.log(discription);

  return (
    <Header
      style={{
        position: "fixed",
        zIndex: 1,
        width: "100%",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "12vh",
      }}
    >
      <Typography.Text
        keyboard
        style={{
          color: "white",
          padding: "4px",
          fontSize: "1.2rem",
        }}
      >
        To D2W - the to do list
      </Typography.Text>

      <Form
        form={form}
        layout="horizontal"
        style={{
          color: "white",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "70vw",
          justifyContent: "space-between",
        }}
        onFinish={onFinish}
      >
        <Space
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "self-start",
            width: "60%",
          }}
        >
          <Typography.Text style={{ color: "white" }}>Title</Typography.Text>
          <Form.Item
            name={"title"}
            style={{ marginRight: 10, width: "20vw" }}
            required
          >
            <Input placeholder="Name the task" size={"large"} />
          </Form.Item>
        </Space>
        <Space
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "self-start",
            width: "100%",
          }}
        >
          <Typography.Text style={{ color: "white" }}>
            Description
          </Typography.Text>
          <Form.Item
            name={"description"}
            style={{ marginRight: 10, width: "40vw" }}
          >
            <Input placeholder="Describe the task" size={"large"} />
          </Form.Item>
        </Space>

        <Form.Item>
          <Button
            type="primary"
            shape="round"
            icon={<PlusOutlined />}
            size={"large"}
            style={{ marginInline: 10, marginTop: 26 }}
            htmlType="submit"
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </Header>
  );
};

export default D2wHeader;
