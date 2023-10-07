import { Button, Space, Typography } from "antd";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { TimelineSetters, TodoItem } from "../../interfaces";



export const makeTimelineItems = (
  items: TodoItem[],
  setters: TimelineSetters
) =>
  items.map((item) => {
    return {
      color: item.completed ? "green" : "gray",
      children: (
        <>
          <Space style={{ paddingBottom: "10px" }}>
            <Space
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "left",
                maxWidth: "40vw",
              }}
              onClick={() => {
                setters.setOpenEdit(true);
                setters.setSelectedId(item.id);
                setters.setSelectedTitle(item.title);
                setters.setSelectedDescription(item.description);
              }}
            >
              <Typography.Text
                strong
                style={{ color: "#444", fontSize: "1.2rem" }}
              >
                {item.title}
              </Typography.Text>
              <Typography.Text
                style={{ color: "black", fontSize: "1rem", top: "10px" }}
              >
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
                onClick={() => {
                  setters.setSelectedId(item.id);
                  setters.setSelectedTitle(item.title);
                  setters.setOpenMarkDone(true);
                }}
              />
              <Button
                size="large"
                danger
                ghost
                icon={<DeleteOutlined />}
                onClick={() => {
                  setters.setSelectedId(item.id);
                  setters.setSelectedTitle(item.title);
                  setters.setOpenDelete(true);
                }}
              />
            </Space>
          </Space>
        </>
      ),
    };
  });
