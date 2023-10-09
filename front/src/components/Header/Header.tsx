import { Typography, Form as AntdForm } from "antd";
import { Header } from "antd/es/layout/layout";
import { Form } from "../ItemForm";
import { TodoListClient } from "../../services";
import { useAuth, useTodoListUpdate, useUpdateSpin } from "../../contexts";
import { CreateItemDTO } from "../../interfaces";
import { useEffect, useMemo } from "react";

function D2wHeader() {
  const updateItems = useTodoListUpdate();
  const updateSpin = useUpdateSpin();
  const [form] = AntdForm.useForm();
  const auth = useAuth();

  // const client = useMemo(() => new TodoListClient(auth? auth : ""), [auth]);
  const client = useMemo(() => new TodoListClient(auth), [auth]);

  useEffect(() => {
    console.log("headers use effect")

    client.setToken(auth);

  }, [client, auth]);

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
