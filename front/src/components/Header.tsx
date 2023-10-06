import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { Header } from "antd/es/layout/layout";
import { PlusOutlined, InfoCircleOutlined } from "@ant-design/icons";


const D2wHeader: React.FC = () => {
  const [form] = Form.useForm();

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
      >
        <Form.Item
          required
          tooltip="This is a required field"
          style={{ marginInline: 10, width: "60%" }}
        >
          <Typography.Text style={{ color: "white" }}>Title</Typography.Text>
          <Input placeholder="Name the task" size={"large"} />
        </Form.Item>
        <Form.Item
          tooltip={{
            title: "Tooltip with customize icon",
            icon: <InfoCircleOutlined />,
          }}
          style={{ marginInline: 10, width: "100%" }}
        >
          <Typography.Text style={{ color: "white" }}>
            Description
          </Typography.Text>
          <Input placeholder="Describe the task" 
          size={"large"}
           />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            shape="round"
            icon={<PlusOutlined />}
            size={"large"}
            style={{ marginInline: 10, marginTop: 18 }}
          >
            Add
          </Button>
        </Form.Item>
      </Form>
    </Header>
  );
};

export default D2wHeader;
