import { useState } from "react";
import { Empty, Layout, Spin, Timeline } from "antd";
import { Modal } from "../Modal";
import {
  useAuth,
  useEditItem,
  useSpin,
  useTodoList,
  useTodoListUpdate,
  useUpdateSpin,
} from "../../contexts";
import { TodoListClient } from "../../services";
import { makeTimelineItems } from "./makeTimelineContent";

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
  const updateSpin = useUpdateSpin();
  const editItem = useEditItem();
  const auth = useAuth();

  const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:8000/api/v1";

  const client = new TodoListClient(baseURL, auth);

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

  const updateItem = async () => {
    updateSpin(true);

    setTimeout(() => {
      updateSpin(false);
    }, 400);

    await client.update(editItem);

    updateItems([], true);
  };

  const timelineSetters = {
    setOpenDelete,
    setOpenMarkDone,
    setOpenEdit,
    setSelectedId,
    setSelectedTitle,
    setSelectedDescription,
  };

  return (
    <Spin style={{ marginTop: "20vh" }} spinning={spinning}>
      <Layout className="main">
        {items.length === 0 && <Empty />}
        <Timeline
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
          items={makeTimelineItems(items, timelineSetters)}
        />
        <Modal
          open={openDelete}
          setOpen={setOpenDelete}
          title="Delete Task"
          description={`Would you like to delete the task "${selectedTitle}"?`}
          commit={() => deleteItem(selectedId)}
        />
        <Modal
          open={openMarkDone}
          setOpen={setOpenMarkDone}
          title="Mark Task Done"
          description={`Would you like to set the task "${selectedTitle}" completed?`}
          commit={() => markDone(selectedId)}
        />
        <Modal
          open={openEdit}
          setOpen={setOpenEdit}
          title="Update Task"
          itemId={selectedId}
          itemTitle={selectedTitle}
          itemDescription={selectedDescription}
          commit={updateItem}
          editionMode
        />
      </Layout>
    </Spin>
  );
}

export default TodoList;
