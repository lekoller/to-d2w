import { useState } from "react";
import { Empty, Layout, Spin, Timeline } from "antd";
import Modal from "../Modal";
import { useSpin, useTodoList, useTodoListUpdate } from "../../contexts";
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

  const timelineSetters = {
    setOpenDelete,
    setOpenMarkDone,
    setOpenEdit,
    setSelectedId,
    setSelectedTitle,
    setSelectedDescription,
  }

  return (
    <Spin style={{ marginTop: "20vh" }} spinning={spinning}>
      <Layout className="main">
        { items.length === 0 && (
          <Empty/>
        )}
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
