import React from "react";
import { Button, Layout, Space, Timeline, Typography } from "antd";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";

interface TodoItem {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TodoListProps {
  items: Array<TodoItem>;
}

const TodoList: React.FC<TodoListProps> = ({ items }: TodoListProps) => {
  const timelineItems = items.map((item) => {
    return {
      color: item.completed ? "green" : "gray",
      children: (
        <Space style={{paddingBottom: "10px"}}>
          <Space
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "left",
              maxWidth: "40vw",
            }}
          >
            <Typography.Text
              strong
              style={{ color: "#444", fontSize: "1.2rem" }}
            >
              {item.title}
            </Typography.Text>
            <Typography.Text  style={{ color: "black", fontSize: "1rem", top: "10px" }}>
              {item.description}
            </Typography.Text>
          </Space>
          <Space style={{ marginLeft: "60px" }}>
            <Button
              size="large"
              type="primary"
              ghost
              disabled={item.completed}
              icon={<CheckCircleOutlined />}
            />
            <Button size="large" danger ghost icon={<DeleteOutlined />} />
          </Space>
        </Space>
      ),
    };
  });

  return (
    <Layout className="main">
      <Timeline
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
        items={timelineItems}
      />
    </Layout>
  );
};

export default TodoList;
