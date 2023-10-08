import { Typography, Form as AntdForm } from "antd";
import { Header } from "antd/es/layout/layout";
import { Form } from "../Form";
import { TodoListClient } from "../../services";
import { useTodoListUpdate, useUpdateSpin } from "../../contexts";
import { CreateItemDTO } from "../../interfaces";

function D2wHeader() {
  const client = new TodoListClient();

  const updateItems = useTodoListUpdate();
  const updateSpin = useUpdateSpin();
  const [form] = AntdForm.useForm();

  const onSubmit = async (values: CreateItemDTO) => {
    updateSpin(true);

    setTimeout(() => {
      updateSpin(false);
    }, 400);

    await client.add(values);

    updateItems([], true);
    form.resetFields();
  };


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
      <Form instance={form} onSubmit={onSubmit} />
    </Header>
  );
}

export default D2wHeader;
