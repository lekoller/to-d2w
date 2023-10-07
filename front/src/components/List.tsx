import { useState } from "react";
import { Button, Layout, Space, Spin, Timeline, Typography } from "antd";
import { CheckCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import Modal from "./Modal";
import { useSpin, useTodoList, useTodoListUpdate } from "../contexts";
import { TodoListClient } from "../services";

function TodoList() {
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openMarkDone, setOpenMarkDone] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedDescription, setSelectedDescription] = useState("");

  const items = useTodoList();
  const updateItems = useTodoListUpdate();
  const spinning = useSpin();

  const client = new TodoListClient();

  const deleteItem = async (id: number) => {
    client.delete(id);

    const remains = items.filter((item) => item.id !== id);

    updateItems(remains);
  };

  const markDone = async (id: number) => {
    client.completeItem(id);

    const updated = items.map((item) => {
      if (item.id === id) {
        item.completed = true;
      }

      return item;
    });

    updateItems(updated);
  };

  const timelineItems = items.map((item) => {
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
                setOpenEdit(true);
                setSelectedId(item.id);
                setSelectedTitle(item.title);
                setSelectedDescription(item.description);
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
                  setSelectedId(item.id);
                  setSelectedTitle(item.title);
                  setOpenMarkDone(true);
                }}
              />
              <Button
                size="large"
                danger
                ghost
                icon={<DeleteOutlined />}
                onClick={() => {
                  setSelectedId(item.id);
                  setSelectedTitle(item.title);
                  setOpenDelete(true);
                }}
              />
            </Space>
          </Space>
        </>
      ),
    };
  });

  return (
    <Spin style={{marginTop: "30vh"}} spinning={spinning}>
    <Layout className="main">
      <Timeline
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
        items={timelineItems}
      />
      <Modal
        open={openDelete}
        setOpen={setOpenDelete}
        title="Delte Task"
        description={`Would you like to delete the task "${selectedTitle}"?`}
        id={selectedId}
        commit={() => deleteItem(selectedId)}
      />
      <Modal
        open={openMarkDone}
        setOpen={setOpenMarkDone}
        title="Mark Task Done"
        description={`Would you like to set the task "${selectedTitle}" completed?`}
        id={selectedId}
        commit={() => markDone(selectedId)}
      />
      <Modal
        open={openEdit}
        setOpen={setOpenEdit}
        title="Update Task"
        id={selectedId}
        itemTitle={selectedTitle}
        itemDescription={selectedDescription}
      />
    </Layout>
    </Spin>
  );
}

export default TodoList;
